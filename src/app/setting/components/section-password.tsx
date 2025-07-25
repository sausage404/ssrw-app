"use client";

import ButtonLoader from "@/components/module/button-loader";
import InputPassword from "@/components/module/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { updateUser } from "@/data/user";
import userSchema from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default ({ user }: Readonly<{ user: User }>) => {

    const [isPending, start] = useTransition();
    const [state, setState] = useState<{ error: string | null, success: string | null }>({
        error: null,
        success: null
    });

    const form = useForm<z.infer<typeof userSchema.changePassword>>({
        resolver: zodResolver(userSchema.changePassword),
        defaultValues: {
            id: user.id,
            current: "",
            new: "",
            confirm: ""
        },
        disabled: isPending
    })

    const onSubmit = async (value: z.infer<typeof userSchema.changePassword>) => start(async () => {
        try {

            if (value.new !== value.confirm) {
                setState({ error: "รหัสผ่านใหม่ไม่ตรงกัน", success: null });
                return;
            }

            await updateUser(user.id, value);
            form.reset();
            setState({ error: null, success: "บันทึกสําเร็จข้อมูลสำเร็จ" });
            setTimeout(() => {
                setState({ error: null, success: null });
            }, 3000);
        } catch (error) {
            setState({ error: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน", success: null });
        }
    })

    return (
        <Form {...form}>
            <form id="section-password">
                <div className="rounded-lg border-accent border">
                    <div className="p-4 rounded-t-lg">
                        <h1 className="text-lg font-bold leading-tight tracking-tighter lg:leading-[2]">
                            รหัสผ่าน
                        </h1>
                        <p className="text-muted-foreground text-sm">กรุณากรอกรหัสผ่านและยืนยันรหัสผ่าน</p>
                    </div>
                    <div className="pb-4 px-4 flex flex-col sm:flex-row gap-4">
                        <FormField
                            control={form.control}
                            name="current"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputPassword
                                            placeholder="รหัสผ่านปัจจุบัน"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="new"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputPassword
                                            placeholder="รหัสผ่านใหม่"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputPassword
                                            placeholder="ยืนยันรหัสผ่าน"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="px-4 py-3 border-t rounded-b-lg flex items-center justify-between">
                        {state.error ? (
                            <p className="text-destructive text-sm">{state.error}</p>
                        ) : state.success ? (
                            <p className="text-green-500 text-sm">{state.success}</p>
                        ) : (
                            <p className="text-muted-foreground text-sm">กรุณายืนยันรหัสผ่านให้ถูกต้องและความยาวไม่น้อยกว่า 8 ตัว</p>
                        )}
                        {isPending ? (
                            <ButtonLoader size="sm">
                                กําลังบันทึก
                            </ButtonLoader>
                        ) : (
                            <Button size="sm" onClick={(e) => {
                                e.preventDefault();
                                onSubmit(form.watch());
                            }}>บันทึก</Button>
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}