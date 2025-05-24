"use client"

import React from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function InputField<T extends Record<string, any>>(props: {
    name: Path<T>,
    label?: string,
    form: UseFormReturn<T, any, T>,
    render: (
        field: ControllerRenderProps<T, any>,
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
                    {props.label && <FormLabel>{props.label}</FormLabel>}
                    {props.render(field, open, setOpen)}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputField