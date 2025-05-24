"use client";

import InputField from "@/components/input-field";
import { Input } from "@/components/ui/input";
import admission from "@/schema/admission";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof admission.admission>>;
}) => {
    return (
        <div className="container mx-auto py-4 px-3">
            <p className="font-semibold text-lg mb-3">ข้อมูลผู้ปกครอง</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                <InputField
                    form={form}
                    name="fatherName"
                    label="ชื่อบิดา"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <InputField
                    form={form}
                    name="fatherPhone"
                    label="เบอร์โทรบิดา"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <InputField
                    form={form}
                    name="fatherJob"
                    label="อาชีพบิดา"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <InputField
                    form={form}
                    name="motherName"
                    label="ชื่อมารดา"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <InputField
                    form={form}
                    name="motherPhone"
                    label="เบอร์โทรมารดา"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <InputField
                    form={form}
                    name="motherJob"
                    label="อาชีพมารดา"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 sm:col-span-2 lg:col-span-3 gap-4">
                    <InputField
                        form={form}
                        name="guardianName"
                        label="ชื่อผู้ปกครอง"
                        render={(field) => (
                            <Input {...field} />
                        )}
                    />
                    <InputField
                        form={form}
                        name="guardianPhone"
                        label="เบอร์โทรผู้ปกครอง"
                        render={(field) => (
                            <Input {...field} />
                        )}
                    />
                    <InputField
                        form={form}
                        name="guardianJob"
                        label="อาชีพผู้ปกครอง"
                        render={(field) => (
                            <Input {...field} />
                        )}
                    />
                    <InputField
                        form={form}
                        name="guardianRelation"
                        label="ความสัมพันธ์"
                        render={(field) => (
                            <Input {...field} />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}