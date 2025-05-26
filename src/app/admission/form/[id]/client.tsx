"use client";

import React from "react";
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
import { Button } from "@/components/ui/button";
import { zodDefault } from "@/lib/utils";
import service from "./service";
import InputImage from "@/components/input-image";
import { toast } from "sonner";
import ButtonLoader from "@/components/button-loader";

export default ({ data, length }: Readonly<{
    data: z.infer<typeof admissionForm.admissionForm>,
    length: number
}>) => {
    const [studentPhoto, setStudentPhoto] = React.useState<File | null>(null);
    const [houseRecord, setHouseRecord] = React.useState<File | null>(null);
    const [studentRecord, setStudentRecord] = React.useState<File | null>(null);

    const [isPending, startTransition] = React.useTransition();

    const form = useForm<z.infer<typeof admission.admission>>({
        resolver: zodResolver(admission.admission),
        defaultValues: {
            ...zodDefault(admission.admission),
            no: length + 1,
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
            alley: "-"
        },
        disabled: isPending
    })

    const onSubmit = (data: z.infer<typeof admission.admission>) => {
        startTransition(async () => {
            const { success, message } = await service(data, {
                studentPhoto,
                houseRecord,
                studentRecord
            });
            if (success) {
                toast.success("สมัครเรียนสําเร็จ", {
                    description: message
                });
                form.reset();
                setStudentPhoto(null);
                setHouseRecord(null);
                setStudentRecord(null);
            } else {
                toast.error("สมัครเรียนไม่สําเร็จ", {
                    description: message
                });
            }
        });
    };

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
                        <InputImage disabled={isPending} value={studentPhoto} onChange={(value) => setStudentPhoto(value)} placeholder="รูปภาพนักเรียน" />
                        <InputImage disabled={isPending} value={houseRecord} onChange={(value) => setHouseRecord(value)} placeholder="รูปภาพทะเบียนบ้าน (เฉพาะสำหรับผู้ที่ไม่ได้สมัครที่โรงเรียน)" />
                        <InputImage disabled={isPending} value={studentRecord} onChange={(value) => setStudentRecord(value)} placeholder="รูปภาพปพ (เฉพาะสำหรับผู้ที่ไม่ได้สมัครที่โรงเรียน)" />
                        <div className="p-4">
                            {
                                isPending ? (
                                    <ButtonLoader disabled className="w-full">กําลังสมัครเรียน</ButtonLoader>
                                ) : (
                                    <Button type="submit" className="w-full" disabled={isPending}>สมัครเรียน</Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        </Form >
    )
}