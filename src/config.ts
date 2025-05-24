import { z } from "zod";
import { Sheet } from "./lib/sheet";
import { Google } from "./lib/google";
import user from "./schema/user";
import admissionForm from "./schema/admission-form";

export const instance = new Google({}).getInstance();

export const db = () => ({
    user: new Sheet<z.infer<typeof user.user>>(instance, process.env.GOOGLE_SPREADSHEET_ID!, "user", [
        'email',
        'password',
        'prefix',
        'firstName',
        'lastName',
        'role'
    ]),
    admissionForm: new Sheet<z.infer<typeof admissionForm.admissionForm>>(instance, process.env.GOOGLE_SPREADSHEET_ID!, "admissionForm", [
        'type',
        'class',
        'round',
        'openedAt',
        'closedAt'
    ])
})