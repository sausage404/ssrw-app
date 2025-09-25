"use client"

import InputPassword from "@/components/module/input-password";
import Turnstile from "@/components/turnstile";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import user from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default ({ error }: Readonly<{ error: string | null }>) => {

    const [isPending, startTransition] = React.useTransition();

    const form = useForm<z.infer<typeof user.credentials>>({
        resolver: zodResolver(user.credentials),
        disabled: isPending,
        defaultValues: {
            prefix: "",
            password: "",
            verified: true
        },
    })

    const onSubmit = async (data: z.infer<typeof user.credentials>) => {
        startTransition(async () => {
            if (data.verified) {
                await signIn("credentials", {
                    prefix: data.prefix,
                    password: data.password
                });
            } else {
                toast.error("กรุณายืนยันการเข้าใช้งาน");
            }
        })
    };

    return (
        <div className="container-fluid mx-auto w-full px-2 sm:px-3 border-x border-dashed h-[83.7dvh] flex items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 flex flex-col gap-4">
                    <div className="text-center leading-[2]">
                        <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
                        <p className="text-muted-foreground">ป้อนอีเมลของคุณด้านล่างเพื่อเข้าสู่ระบบบัญชีของคุณ</p>
                    </div>
                    {error && <p className="text-red-500 text-center">{new AuthError(error).message}</p>}
                    <FormField
                        control={form.control}
                        name="prefix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เลขประจำตัวนักเรียน (หรือ email ของครูไม่ต้องใส่ @ssrw.ac.th)</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                    {/* <div className="flex justify-center">
                        <FormField
                            control={form.control}
                            name="verified"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Turnstile onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div> */}
                    <Button>เข้าสู่ระบบ</Button>
                </form>
            </Form>
        </div>
    )
}