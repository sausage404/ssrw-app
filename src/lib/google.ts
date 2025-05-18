import { JWT } from 'google-auth-library';
import { drive_v3, google, sheets_v4 } from 'googleapis';

export type GoogleInstance = {
    auth: JWT;
    drive: drive_v3.Drive;
    sheet: sheets_v4.Sheets;
}

export class Google {
    private auth: JWT;
    private drive: drive_v3.Drive;
    private sheet: sheets_v4.Sheets;
    
    constructor({
        email = process.env.GOOGLE_EMAIL!,
        key = process.env.GOOGLE_PRIVATE_KEY!
    }) {
        this.auth = new JWT({
            email: email,
            key: key?.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        });
        
        this.drive = google.drive({
            version: 'v3',
            auth: this.auth
        });
        
        this.sheet = google.sheets({
            version: 'v4',
            auth: this.auth
        });
        
        return this;
    }
    
    public getInstance(): GoogleInstance {
        return {
            auth: this.auth,
            drive: this.drive,
            sheet: this.sheet
        };
    }
}