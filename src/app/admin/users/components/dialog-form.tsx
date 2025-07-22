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
import user from "@/schema/user"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

export default ({ form, onSubmit }: {
    form: UseFormReturn<z.infer<typeof user.user>>,
    onSubmit: (value: z.infer<typeof user.user>) => void
}) => (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>อีเมล</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>รหัสผ่าน</FormLabel>
                            <FormControl>
                                <InputPassword {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="prefix"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>คํานําหน้า</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="คํานําหน้า" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {user.prefix.options.map((prefix, index) => (
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
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ชื่อ</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>นามสกุล</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                <FormField
                    control={form.control}
                    name="level"
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
                <FormField
                    control={form.control}
                    name="room"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>ห้อง</FormLabel>
                            <FormControl>
                                <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="no"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>เลขที่</FormLabel>
                            <FormControl>
                                <Input value={isNaN(value) ? 0 : value} onChange={(e) => onChange(parseInt(e.target.value))} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>บทบาท</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="บทบาท" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {user.role.options.map((role, index) => (
                                            <SelectItem key={index} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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