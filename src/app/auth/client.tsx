"use client"

import { useAuth } from "@/components/context/use-auth";
import InputPassword from "@/components/input-password";
import Turnstile from "@/components/turnstile";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import user from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default ({ from }: Readonly<{ from: string | null }>) => {
    const { signIn, error, auth, loading } = useAuth();

    const router = useRouter();

    const form = useForm<z.infer<typeof user.credentials>>({
        resolver: zodResolver(user.credentials),
        defaultValues: {
            email: "11857@ssrw.ac.th",
            password: "12345678"
        },
        disabled: loading
    })

    useEffect(() => {
        if (auth) {
            router.push(from ? from : "/");
        }
    }, [auth]);

    const onSubmit = async (data: z.infer<typeof user.credentials>) => {
        await signIn(data);
    }

    return (
        <div className="container-fluid mx-auto w-full px-2 sm:px-3 border-x border-dashed h-[83.7dvh] flex items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 flex flex-col gap-4">
                    <div className="text-center leading-[2]">
                        <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>
                        <p className="text-muted-foreground">ป้อนอีเมลของคุณด้านล่างเพื่อเข้าสู่ระบบบัญชีของคุณ</p>
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <InputPassword {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
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
                    </div>
                    <Button>เข้าสู่ระบบ</Button>
                </form>
            </Form>
        </div>
    )
}