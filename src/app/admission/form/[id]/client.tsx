"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import admission from "@/schema/admission";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import admissionForm from "@/schema/admission-form";
import FieldAdmissionInfo from "../../components/field-admission-info";
import FieldInfomation from "../../components/field-infomation";
import FieldStudentInfo from "../../components/field-student-info";
import FieldOldSchoolInfo from "../../components/field-old-school-info";
import FieldGuardianInfo from "../../components/field-guardian-info";
import FieldImage from "../../components/field-image";
import { Button } from "@/components/ui/button";
import { getFullName, zodDefault } from "@/lib/utils";
import axios from "axios";

export default ({ data, length }: Readonly<{
    data: z.infer<typeof admissionForm.admissionForm>,
    length: number
}>) => {
    const openedAt = new Date(data.openedAt).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const closedAt = new Date(data.closedAt).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const form = useForm<z.infer<typeof admission.admission>>({
        resolver: zodResolver(admission.admission),
        defaultValues: {
            ...zodDefault(admission.admission),
            academicYear: (() => {
                const month = new Date().getMonth();
                const year = new Date().getFullYear();
                return month > 3 && data.type === admissionForm.type.enum.move ? year - 1 : year
            })(),
            ...(
                (data.class < 4 ||
                    (
                        data.type === admissionForm.type.enum.move ||
                        data.round === admissionForm.round.enum.special
                    )
                ) && {
                    reservePlan: "-"
                }
            ),
            round: data.round,
            class: Number(data.class),
            type: data.type,
            ethnicity: "ไทย",
            nationality: "ไทย",
            religion: "พุทธ",
            road: "-",
            alley: "-",
        },
    })

    useEffect(() => {
        console.log(admission.admission.safeParse(form.watch()).error?.message);
    }, [form.watch()])

    const onSubmit = async (data: z.infer<typeof admission.admission>) => {
        try {
            const fullName = getFullName(data);
            const formData = new FormData();
            formData.append("name", fullName);
            formData.append("studentPhoto", data.studentPhoto);
            const { data: id } = await axios.post("/api/data/student-photo", formData);
            const { data: template } = await axios.get("/html/admission.html", {
                responseType: "text"
            });
            let html = template;
            Object.entries({
                ...data,
                no: length + 1,
                round: admissionForm.roundView[data.round],
                type: admissionForm.typeView[data.type],
                studentPhoto: `https://drive.google.com/uc?export=view&id=${id}`,
                birthDate: data.birthDate.toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })
            }).forEach(([key, value]) => html = html.replaceAll(`{${key}}`, value));
            const { data: file } = await axios.put("http://localhost:4000/pdf", {
                html,
                name: fullName,
                isLocal: true
            }, { responseType: "blob" });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container-fluid border-x border-dashed mx-auto">
                <div className="p-8 space-y-1 border-b border-dashed">
                    <p className="text-xl font-semibold">
                        ประกาศ{admissionForm.typeView[data.type]}โรงเรียนศรีสองรักษ์วิทยา ระดับชั้นมัธยมศึกษาปีที่ {data.class} {admissionForm.roundView[data.round]}
                    </p>
                    <p>รับสมัครระหว่างวันที่ {openedAt} ถึงวันที่ {closedAt} นักเรียนสามารถสมัครเรียนผ่านระบบออนไลน์ ที่เว็บไซต์ ssrw.ac.th</p>
                    <p>(เอกสารประกอบการสมัครเรียน นักเรียนสามารถส่งได้ในวันสอบ)</p>
                </div>
                <div className="flex md:flex-row flex-col divide-x divide-dashed">
                    <div className="w-full">
                        <FieldAdmissionInfo data={data} form={form} />
                        <FieldStudentInfo form={form} />
                        <FieldInfomation form={form} />
                        <FieldOldSchoolInfo form={form} />
                        <FieldGuardianInfo form={form} />
                    </div>
                    <div className="md:max-w-[18rem] w-full divide-y divide-dashed">
                        <FieldImage form={form} />
                        <div className="p-4">
                            <Button type="submit" className="w-full">สมัครเรียน</Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form >
    )
}