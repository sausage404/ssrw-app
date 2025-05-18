import { drive_v3 } from "googleapis";
import { GoogleInstance } from "./google";

export class Drive {
    private google: GoogleInstance;

    constructor(google: GoogleInstance) {
        this.google = google;
    }

    public async createFolder(name: string, parentId?: string): Promise<string> {
        const fileMetadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: parentId ? [parentId] : undefined
        };

        const response = await this.google.drive.files.create({
            requestBody: fileMetadata,
            fields: 'id'
        });

        if (!response.data.id) {
            throw new Error('Failed to create folder');
        }

        return response.data.id;
    }

    public async uploadFile(name: string, content: Buffer, mimeType: string, parentId?: string): Promise<string> {
        const fileMetadata = {
            name: name,
            parents: parentId ? [parentId] : undefined
        };

        const media = {
            mimeType: mimeType,
            body: content
        };

        const response = await this.google.drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id'
        });

        if (!response.data.id) {
            throw new Error('Failed to upload file');
        }

        return response.data.id;
    }

    public async getFile(fileId: string): Promise<Buffer> {
        const response = await this.google.drive.files.get({
            fileId: fileId,
            alt: 'media'
        }, {
            responseType: 'arraybuffer'
        });

        return Buffer.from(response.data as ArrayBuffer);
    }

    public async listFiles(folderId?: string, query?: string): Promise<drive_v3.Schema$File[]> {
        let q = '';

        if (folderId) {
            q += `'${folderId}' in parents`;
        }

        if (query) {
            if (q) q += ' and ';
            q += query;
        }

        const response = await this.google.drive.files.list({
            q: q || undefined,
            fields: 'files(id, name, mimeType, size, createdTime, modifiedTime)',
            spaces: 'drive'
        });

        return response.data.files || [];
    }

    public async deleteFile(fileId: string): Promise<void> {
        await this.google.drive.files.delete({
            fileId: fileId
        });
    }

    public async updateFile(fileId: string, content: Buffer, mimeType: string): Promise<void> {
        await this.google.drive.files.update({
            fileId: fileId,
            media: {
                mimeType: mimeType,
                body: content
            }
        });
    }

    public async shareFile(fileId: string, emailAddress: string, role: 'reader' | 'writer' | 'commenter' | 'owner'): Promise<void> {
        await this.google.drive.permissions.create({
            fileId: fileId,
            requestBody: {
                type: 'user',
                role: role,
                emailAddress: emailAddress
            }
        });
    }

    public async createSpreadsheet(name: string, parentId?: string): Promise<string> {
        const fileMetadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.spreadsheet',
            parents: parentId ? [parentId] : undefined
        };

        const response = await this.google.drive.files.create({
            requestBody: fileMetadata,
            fields: 'id'
        });

        if (!response.data.id) {
            throw new Error('Failed to create spreadsheet');
        }

        return response.data.id;
    }

    public async searchFiles(query: string): Promise<drive_v3.Schema$File[]> {
        const response = await this.google.drive.files.list({
            q: `name contains '${query}'`,
            fields: 'files(id, name, mimeType, size, createdTime, modifiedTime)',
            spaces: 'drive'
        });

        return response.data.files || [];
    }
}