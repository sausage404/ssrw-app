import InputPassword from "@/components/module/input-password"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import admissionForm from "@/schema/admission-form"
import { ThaiCalendarPopover } from "@/components/module/thai-calendar-popover"

export default ({ form, onSubmit }: {
    form: UseFormReturn<z.infer<typeof admissionForm.admissionForm>>,
    onSubmit: (value: z.infer<typeof admissionForm.admissionForm>) => void
}) => (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ประเภท</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="กรุณาเลือกประเภท" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {admissionForm.type.options.map((prefix, index) => (
                                            <SelectItem key={index} value={prefix}>
                                                {prefix}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="round"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>รอบรับสมัคร</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                    <SelectTrigger className="w-full max-w-full">
                                        <SelectValue placeholder="กรุณาเลือกรอบรับสมัคร" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {admissionForm.round.options.map((prefix, index) => (
                                            <SelectItem key={index} value={prefix}>
                                                {prefix}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="class"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>ระดับชั้น</FormLabel>
                            <FormControl>
                                <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="openedAt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>วันที่เปิด</FormLabel>
                            <FormControl>
                                <ThaiCalendarPopover label="เลือกวันที่เปิดรับสมัคร" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="closedAt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>วันที่ปิด</FormLabel>
                            <FormControl>
                                <ThaiCalendarPopover label="เลือกวันที่ปิดรับสมัคร" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>บันทึก</Button>
                <DialogClose asChild>
                    <Button variant="outline">ยกเลิก</Button>
                </DialogClose>
            </div>
        </form>
    </Form>
)