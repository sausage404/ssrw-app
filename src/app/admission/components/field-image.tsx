import InputField from "@/components/input-field"
import InputImage from "@/components/input-image"
import admission from "@/schema/admission"
import React from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

export default ({
    form
}: {
    form: UseFormReturn<z.infer<typeof admission.admission>>
}) => (
    <React.Fragment>
        <InputField
            form={form}
            name="studentPhoto"
            render={(field) => (
                <InputImage {...field} placeholder="รูปภาพนักเรียน" />
            )}
        />
        <InputField
            form={form}
            name="houseRecord"
            render={(field) => (
                <InputImage {...field} placeholder="รูปภาพทะเบียนบ้าน (เฉพาะสำหรับผู้ที่ไม่ได้สมัครที่โรงเรียน)" />
            )}
        />
        <InputField
            form={form}
            name="studentRecord"
            render={(field) => (
                <InputImage {...field} placeholder="รูปภาพปพ (เฉพาะสำหรับผู้ที่ไม่ได้สมัครที่โรงเรียน)" />
            )}
        />
    </React.Fragment>
)