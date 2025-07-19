import { z } from "zod";
import { Sheet } from "./lib/sheet";
import { Google } from "./lib/google";
import user from "./schema/user";
import admissionForm from "./schema/admission-form";
import admission from "./schema/admission";
import { Drive } from "./lib/drive";
import announcement from "./schema/announcement";
import club from "./schema/club";

export const instance = new Google({}).getInstance();

export const db = () => ({
    user: new Sheet<z.infer<typeof user.user>>(
        instance,
        process.env.GOOGLE_SPREADSHEET_ID!,
        "user",
        [
            'email',
            'password',
            'prefix',
            'firstName',
            'lastName',
            'behaviorPoint',
            'clubId',
            'level',
            'room',
            'no',
            'role'
        ]
    ),
    admissionForm: new Sheet<z.infer<typeof admissionForm.admissionForm>>(
        instance,
        process.env.GOOGLE_SPREADSHEET_ID!,
        "admissionForm",
        [
            'type',
            'class',
            'round',
            'openedAt',
            'closedAt'
        ]
    ),
    admission: new Sheet<z.infer<typeof admission.admission>>(
        instance,
        process.env.GOOGLE_SPREADSHEET_ID!,
        "admission",
        Object.keys(admission.admission._def.shape()) as (keyof z.infer<typeof admission.admission>)[]
    ),
    announcement: new Sheet<z.infer<typeof announcement.announcement>>(
        instance,
        process.env.GOOGLE_SPREADSHEET_ID!,
        "announcement",
        [
            "id",
            "description",
            "isSummarize",
            "occurredAt"
        ]
    ),
    club: new Sheet<z.infer<typeof club.club>>(
        instance,
        process.env.GOOGLE_SPREADSHEET_ID!,
        "club",
        [
            "userId",
            "name",
            "description",
            "status",
            "maxMember"
        ]
    )
})

export const drive = new Drive(instance);