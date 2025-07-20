import InputField from "@/components/input-field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { getPlans, getReservePlans } from "../utils";
import admission from "@/schema/admission";
import admissionForm from "@/schema/admission-form";

export default ({
    data,
    form,
}: {
    data: z.infer<typeof admissionForm.admissionForm>;
    form: UseFormReturn<z.infer<typeof admission.admission>>;
}) => {
    return (
        <div className="container mx-auto py-4 px-3 border-b border-dashed">
            <p className="font-semibold text-lg mb-3">ข้อมูลการสมัคร</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {data.class !== 1 && (
                    <InputField
                        form={form}
                        name="studentId"
                        label="รหัสนักเรียน"
                        render={(field) => (
                            <Input {...field} />
                        )} />
                )}
                {data.class >= 4 && (
                    <InputField
                        form={form}
                        name="serviceZone"
                        label="พื้นที่ให้บริการ"
                        render={({ onChange, ...field }) => (
                            <Select onValueChange={onChange} {...field}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="พื้นที่ให้บริการ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="เขตพื้นที่บริการ">เขตพื้นที่บริการ</SelectItem>
                                    <SelectItem value="นอกเขตพื้นที่บริการ">นอกเขตพื้นที่บริการ</SelectItem>
                                </SelectContent>
                            </Select>
                        )} />
                )}
                <InputField
                    form={form}
                    name="provenance"
                    label="มาจากโรงเรียน"
                    render={({ onChange, ...field }) => (
                        <Select onValueChange={onChange} {...field}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="มาจากโรงเรียน" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="โรงเรียนเดิม">โรงเรียนเดิม</SelectItem>
                                <SelectItem value="โรงเรียนอื่น">โรงเรียนอื่น</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                <InputField
                    form={form}
                    name="plan"
                    label="แผนการเรียน"
                    render={({ onChange, ...field }) => (
                        <Select
                            onValueChange={(value) => {
                                onChange(value);
                                form.resetField("reservePlan");
                            }}
                            {...field}
                        >
                            <SelectTrigger className="w-full min-w-full">
                                <SelectValue placeholder="แผนการเรียน" />
                            </SelectTrigger>
                            <SelectContent>
                                {getPlans(data.round, data.type, data.class).map((plan) => (
                                    <SelectItem key={plan} value={plan}>
                                        {plan}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )} />
                {data.class >= 4 && data.type === admissionForm.type.enum.NEW && data.round !== admissionForm.round.enum.SPECIAL && (
                    <InputField
                        form={form}
                        name="reservePlan"
                        label="แผนการเรียนเพิ่มเติม"
                        render={({ onChange, ...field }) => (
                            <Select onValueChange={onChange} {...field}>
                                <SelectTrigger className="w-full min-w-full">
                                    <SelectValue placeholder="แผนการเรียนสำรอง" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getReservePlans([form.watch("plan")]).map((plan) => (
                                        <SelectItem key={plan} value={plan}>
                                            {plan}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )} />
                )}
            </div>
        </div>
    )
}