"use client";

import ButtonLoader from "@/components/button-loader";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

    const form = useForm<z.infer<typeof user.user>>({
        resolver: zodResolver(user.user),
        defaultValues: {
            prefix: auth.prefix as z.infer<typeof user.prefix>,
            firstName: auth.firstName,
            lastName: auth.lastName
        },
        disabled: isPending
    })

    const onSubmit = async (value: z.infer<typeof user.user>) => start(async () => {
        const { data } = await axios.put("/api/data/user", value);

        if (data.success) {
            await refresh({
                ...auth,
                prefix: value.prefix,
                firstName: value.firstName,
                lastName: value.lastName
            });
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
            <form id="section-information">
                <div className="rounded-lg border-accent border">
                    <div className="p-4 rounded-t-lg">
                        <h1 className="text-lg font-bold leading-tight tracking-tighter lg:leading-[2]">
                            ข้อมูลส่วนตัว
                        </h1>
                        <p className="text-muted-foreground text-sm">กรุณากรอกชื่อ-นามสกุล และคำนำหน้า</p>
                    </div>
                    <div className="pb-4 px-4 flex flex-col sm:flex-row gap-4">
                        <FormField
                            control={form.control}
                            name="prefix"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={field.disabled}>
                                            <SelectTrigger disabled className="w-full">
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
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input readOnly {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="px-4 py-4 border-t rounded-b-lg flex items-center justify-between">
                        {state.error ? (
                            <p className="text-destructive text-sm">{state.error}</p>
                        ) : state.success ? (
                            <p className="text-green-500 text-sm">{state.success}</p>
                        ) : (
                            <p className="text-muted-foreground text-sm">กรุณากรอกชื่อจริงและนามสกุลของคุณ เนื่องจากจะใช้ชื่อและนามสกุลนี้</p>
                        )}
                        {/* {isPending ? (
                            <ButtonLoader size="sm">
                                กําลังบันทึก
                            </ButtonLoader>
                        ) : (
                            <Button size="sm" onClick={(e) => {
                                e.preventDefault();
                                onSubmit(form.watch());
                            }}>บันทึก</Button>
                        )} */}
                    </div>
                </div>
            </form>
        </Form >
    )
}
