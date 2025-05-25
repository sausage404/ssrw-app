import { drive_v3 } from "googleapis";
import { GoogleInstance } from "./google";
import { Readable } from "stream";

export class Drive {
    private google: GoogleInstance;

    constructor(google: GoogleInstance) {
        this.google = google;
    }

    public async createFolder(name: string, parentId?: string) {
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

        return response.data;
    }

    public async uploadFile(name: string, content: Buffer, mimeType: string, parentId?: string) {
        const fileMetadata = {
            name: name,
            parents: parentId ? [parentId] : undefined
        };

        const bufferStream = new Readable({
            read() {
                this.push(content);
                this.push(null);
            }
        });

        const media = {
            mimeType: mimeType,
            body: bufferStream
        };

        const response = await this.google.drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, name, parents, webViewLink, webContentLink'
        });

        if (!response.data.id) {
            throw new Error('Failed to upload file');
        }

        return response.data;
    }

    public async uploadFileFromFormData(file: File, parentId?: string) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;

        return await this.uploadFile(fileName, buffer, file.type, parentId);
    }

    public async uploadFileFromBase64(
        name: string,
        base64Data: string,
        mimeType: string,
        parentId?: string
    ) {
        const base64String = base64Data.replace(/^data:[^;]+;base64,/, '');
        const buffer = Buffer.from(base64String, 'base64');

        return await this.uploadFile(name, buffer, mimeType, parentId);
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
            fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
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
        const bufferStream = new Readable({
            read() {
                this.push(content);
                this.push(null);
            }
        });

        await this.google.drive.files.update({
            fileId: fileId,
            media: {
                mimeType: mimeType,
                body: bufferStream
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

    public async makeFilePublic(fileId: string): Promise<string> {
        try {
            await this.google.drive.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                }
            });

            return `https://drive.google.com/uc?id=${fileId}`;
        } catch (error) {
            console.error('Error making file public:', error);
            throw error;
        }
    }

    public async isFilePublic(fileId: string): Promise<boolean> {
        try {
            const permissions = await this.google.drive.permissions.list({
                fileId: fileId,
                fields: 'permissions(type, role)'
            });

            return permissions.data.permissions?.some(
                permission => permission.type === 'anyone'
            ) || false;
        } catch (error) {
            console.error('Error checking file permissions:', error);
            return false;
        }
    }

    public async createSpreadsheet(name: string, parentId?: string) {
        const fileMetadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.spreadsheet',
            parents: parentId ? [parentId] : undefined
        };

        const response = await this.google.drive.files.create({
            requestBody: fileMetadata,
            fields: 'id, name, webViewLink'
        });

        if (!response.data.id) {
            throw new Error('Failed to create spreadsheet');
        }

        return response.data;
    }

    public async searchFiles(query: string): Promise<drive_v3.Schema$File[]> {
        const response = await this.google.drive.files.list({
            q: `name contains '${query}'`,
            fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
            spaces: 'drive'
        });

        return response.data.files || [];
    }

    public async searchImages(query?: string): Promise<drive_v3.Schema$File[]> {
        let q = "mimeType contains 'image/'";

        if (query) {
            q += ` and name contains '${query}'`;
        }

        const response = await this.google.drive.files.list({
            q: q,
            fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
            spaces: 'drive',
            orderBy: 'createdTime desc'
        });

        return response.data.files || [];
    }

    public async getStorageQuota() {
        try {
            const response = await this.google.drive.about.get({
                fields: 'storageQuota'
            });

            return response.data.storageQuota;
        } catch (error) {
            console.error('Error getting storage quota:', error);
            throw error;
        }
    }

    public async renameFile(fileId: string, newName: string): Promise<void> {
        await this.google.drive.files.update({
            fileId: fileId,
            requestBody: {
                name: newName
            }
        });
    }

    public async moveFile(fileId: string, newParentId: string): Promise<void> {

        const file = await this.google.drive.files.get({
            fileId: fileId,
            fields: 'parents'
        });

        const previousParents = file.data.parents?.join(',');

        await this.google.drive.files.update({
            fileId: fileId,
            addParents: newParentId,
            removeParents: previousParents,
            fields: 'id, parents'
        });
    }

    public async copyFile(fileId: string, newName: string, parentId?: string) {
        const response = await this.google.drive.files.copy({
            fileId: fileId,
            requestBody: {
                name: newName,
                parents: parentId ? [parentId] : undefined
            },
            fields: 'id, name, parents'
        });

        return response.data;
    }
}