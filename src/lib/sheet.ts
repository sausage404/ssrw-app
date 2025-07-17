import { GoogleInstance } from "./google";

export type SheetBase<V> = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
} & V

export class Sheet<V> {
    private google: GoogleInstance;
    private map = new Map<string, SheetBase<V>>();
    private spreadsheetId: string;
    private sheetName: string;
    private columns: Array<keyof SheetBase<V>>;

    constructor(google: GoogleInstance, spreadsheetId: string, sheetName: string, columns: Array<keyof V>) {
        this.google = google;
        this.spreadsheetId = spreadsheetId;
        this.sheetName = sheetName;
        this.columns = [
            'id',
            ...columns,
            'createdAt',
            'updatedAt'
        ];

        this.load();
    }

    public async load(): Promise<void> {
        try {
            const response = await this.google.sheet.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: this.sheetName
            });

            const rows = response.data.values || [];

            // Skip header row
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const item = this.rowToObject(row);
                if (item && item.id) {
                    this.map.set(item.id, item);
                }
            }
        } catch (error) {
            console.error(`Failed to load sheet: ${error}`);
            throw error;
        }
    }

    private rowToObject(row: any[]): SheetBase<V> | null {
        if (!row || row.length === 0) return null;

        const obj: any = {};

        this.columns.forEach((key, index) => {
            if (index < row.length) {
                const value = row[index];
                // Handle date fields
                if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)) {
                    obj[key] = value ? new Date(value) : new Date();
                } else if (!isNaN(Number(value))) {
                    obj[key] = Number(value);
                } else if (value === 'TRUE' || value === 'FALSE') {
                    obj[key] = value === 'TRUE';
                } else {
                    obj[key] = value;
                }
            }
        });

        return obj as SheetBase<V>;
    }

    private objectToRow(item: SheetBase<V>): any[] {
        return this.columns.map(key => {
            const value = item[key];

            if (value instanceof Date) {
                return value.toISOString();
            }

            return value === undefined ? '' : value;
        });
    }

    public get size() {
        return this.map.size;
    }

    public async create(item: Omit<V, 'id' | 'createdAt' | 'updatedAt'>): Promise<SheetBase<V>> {
        const id = this.generateId();
        const now = new Date();

        const newItem = {
            ...item as any,
            id,
            createdAt: now,
            updatedAt: now
        } as SheetBase<V>;

        const row = this.objectToRow(newItem);

        await this.google.sheet.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [row]
            }
        });

        this.map.set(id, newItem);
        return newItem;
    }

    public async update(id: string, data: Partial<SheetBase<V>>): Promise<V | null> {
        const item = await this.get(id);
        if (!item) return null;

        const updatedItem = {
            ...item,
            ...data as any,
            updatedAt: new Date()
        };

        // Find row index for the item
        const response = await this.google.sheet.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName
        });

        const rows = response.data.values || [];
        let rowIndex = -1;

        for (let i = 0; i < rows.length; i++) {
            if (rows[i][0] === id) {
                rowIndex = i + 1; // +1 because sheets are 1-indexed
                break;
            }
        }

        if (rowIndex === -1) return null;

        const range = `${this.sheetName}!A${rowIndex}:${this.getColumnLetter(this.columns.length)}${rowIndex}`;
        await this.google.sheet.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [this.objectToRow(updatedItem)]
            }
        });

        this.map.set(id, updatedItem);
        return updatedItem;
    }

    public async delete(id: string): Promise<boolean> {
        if (!this.map.has(id)) return false;

        // Find row index
        const response = await this.google.sheet.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName
        });

        const rows = response.data.values || [];
        let rowIndex = -1;

        for (let i = 1; i < rows.length; i++) {
            if (rows[i][0] === id) {
                rowIndex = i + 1; // +1 because sheets are 1-indexed
                break;
            }
        }

        if (rowIndex === -1) return false;

        // Delete row
        const sheetId = await this.getNumericSheetId();
        await this.google.sheet.spreadsheets.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            requestBody: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: sheetId,
                                dimension: 'ROWS',
                                startIndex: rowIndex - 1, // -1 because batchUpdate is 0-indexed
                                endIndex: rowIndex
                            }
                        }
                    }
                ]
            }
        });

        this.map.delete(id);
        return true;
    }

    public async get(id: string): Promise<SheetBase<V> | undefined> {
        await this.load();
        return this.map.get(id);
    }

    public async getAll(): Promise<Array<SheetBase<V>>> {
        await this.load();
        return Array.from(this.map.values());
    }

    public async find(predicate: (value: V) => boolean): Promise<SheetBase<V> | undefined> {
        for (const value of await this.getAll()) {
            if (predicate(value)) {
                return value;
            }
        }
        return undefined;
    }

    public async filter(predicate: (value: V) => boolean): Promise<Array<SheetBase<V>>> {
        return (await this.getAll()).filter(predicate);
    }

    private async getNumericSheetId(): Promise<number> {
        const response = await this.google.sheet.spreadsheets.get({
            spreadsheetId: this.spreadsheetId
        });

        const sheet = response.data.sheets?.find(s =>
            s.properties?.title === this.sheetName);

        if (!sheet || !sheet.properties?.sheetId) {
            throw new Error(`Sheet ${this.sheetName} not found`);
        }

        return sheet.properties.sheetId;
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    private getColumnLetter(index: number): string {
        let temp: number;
        let letter = '';

        while (index > 0) {
            temp = (index - 1) % 26;
            letter = String.fromCharCode(temp + 65) + letter;
            index = (index - temp - 1) / 26;
        }

        return letter;
    }
}
