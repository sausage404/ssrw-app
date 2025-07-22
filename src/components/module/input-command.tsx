"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import admission from "@/schema/admission";
import { ChevronsUpDown } from "lucide-react";

export default ({
    children,
    field,
    placeholder,
    open,
    onOpenChange
}: {
    children: React.ReactNode;
    field: ControllerRenderProps<z.infer<typeof admission.admission>, any>;
    placeholder?: string;
    open: boolean;
    onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="justify-between w-full"
                >
                    {(field.value && field.value.length) ? field.value : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                {children}
            </PopoverContent>
        </Popover>
    );
};