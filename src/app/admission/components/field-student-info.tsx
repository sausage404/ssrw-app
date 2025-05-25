import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import admission from "@/schema/admission";
import user from "@/schema/user";
import InputField from "@/components/input-field";
import { ThaiCalendarPopover } from "@/components/thai-calendar-popover";

export default ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof admission.admission>>;
}) => {
    return (
        <div className="container mx-auto py-4 px-3 border-b border-dashed">
            <p className="font-semibold text-lg mb-3">ข้อมูลนักเรียน</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <InputField
                    form={form}
                    name="prefix"
                    label="คํานําหน้า"
                    render={(field) => (
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="คํานําหน้า" />
                            </SelectTrigger>
                            <SelectContent>
                                {user.prefix.options.map((prefix) => (
                                    <SelectItem key={prefix} value={prefix}>
                                        {prefix}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )} />
                <InputField
                    form={form}
                    name="firstName"
                    label="ชื่อ"
                    render={(field) => (
                        <Input placeholder="ไม่ต้องระบุคำนำหน้า" {...field} />
                    )} />
                <InputField
                    form={form}
                    name="lastName"
                    label="นามสกุล"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="birthDate"
                    label="วันเกิด"
                    render={(field) => (
                        <ThaiCalendarPopover disabled={field.disabled} field={field}
                            label="เลือก วัน/เดือน/ปี เกิด" />
                    )} />
                <InputField
                    form={form}
                    name="cardId"
                    label="หมายเลขบัตรประชาชน"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="ethnicity"
                    label="เชื้อชาติ"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="nationality"
                    label="สัญชาติ"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="religion"
                    label="ศาสนา"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="bloodType"
                    label="หมู่เลือด"
                    render={(field) => (
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="หมู่เลือด" />
                            </SelectTrigger>
                            <SelectContent>
                                {admission.bloodType.options.map((bloodType) => (
                                    <SelectItem key={bloodType} value={bloodType}>
                                        {bloodType}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )} />
                <InputField
                    form={form}
                    name="phone"
                    label="เบอร์โทรศัพท์"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="talent"
                    label="ความสามารถพิเศษ"
                    render={(field) => (
                        <Input {...field} />
                    )} />
            </div>
        </div>
    )
}