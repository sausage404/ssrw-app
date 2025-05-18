import { z } from "zod";
import { Sheet } from "./lib/sheet";
import { Google } from "./lib/google";
import user from "./schema/user";

export const instance = new Google({}).getInstance();

export const db = {
    user: new Sheet<z.infer<typeof user.user>>(instance, process.env.GOOGLE_SPREADSHEET_ID!, "user", [
        'email',
        'password',
        'firstName',
        'lastName',
        'role'
    ])
}