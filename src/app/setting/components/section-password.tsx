"use client";

import ButtonLoader from "@/components/button-loader";
import { useAuth } from "@/components/context/use-auth";
import InputPassword from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Auth } from "@/lib/session";
import user from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default ({ auth }: Readonly<{ auth: Auth }>) => {

    const { refresh } = useAuth();
    const [isPending, start] = useTransition();
    const [state, setState] = useState<{ error: string | null, success: string | null }>({
        error: null,
        success: null
    });

    const form = useForm<z.infer<typeof user.changePassword>>({
        resolver: zodResolver(user.changePassword),
        defaultValues: {
            id: auth.id,
            current: "",
            new: "",
            confirm: ""
        },
        disabled: isPending
    })

    const onSubmit = async (value: z.infer<typeof user.changePassword>) => start(async () => {

        if (value.new !== value.confirm) {
            setState({ error: "รหัสผ่านใหม่ไม่ตรงกัน", success: null });
            return;
        }

        const { data } = await axios.patch("/api/data/user/change-password", value);

        if (data.success) {
            await refresh({
                ...auth,
                password: data.value
            });
            form.reset();
            setState({ error: null, success: "บันทึกสําเร็จข้อมูลสำเร็จ" });
        } else {
            setState({ error: data.message, success: null });
        }

        setTimeout(() => {
            setState({ error: null, success: null });
        }, 3000);
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
                    <div className="pb-4 px-4 flex gap-4">
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