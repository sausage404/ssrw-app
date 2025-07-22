"use client";

import React from "react";
import InputCommand from "@/components/module/input-command";
import InputField from "@/components/module/input-field";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { getDistricts, getProvinces, getSubDistricts, getZipCode, ThaiAddressDistrict, ThaiAddressProvince, ThaiAddressSubDistrict } from "@/lib/thai-address";
import admission from "@/schema/admission";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof admission.admission>>;
}) => {

    const [province, setProvince] = React.useState<ThaiAddressProvince>([]);
    const [district, setDistrict] = React.useState<ThaiAddressDistrict>([]);
    const [subDistrict, setSubDistrict] = React.useState<ThaiAddressSubDistrict>([]);

    React.useEffect(() => {
        getProvinces()
            .then((res) => setProvince(res));
        getDistricts(
            form.getValues("province")
        ).then((res) => setDistrict(res));
        getSubDistricts(
            form.getValues("province"),
            form.getValues("district")
        ).then((res) => setSubDistrict(res));
        getZipCode(
            form.getValues("province"),
            form.getValues("district"),
            form.getValues("subDistrict")
        ).then((res) => {
            form.setValue("zipcode", res.toString());
        })
    }, [
        form.watch("province"),
        form.watch("district"),
        form.watch("subDistrict")
    ])

    return (
        <div className="container mx-auto py-4 px-3 border-b border-dashed">
            <p className="font-semibold text-lg mb-3">ข้อมูลที่อยู่</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <InputField
                    form={form}
                    name="houseNo"
                    label="บ้านเลขที่"
                    render={({ value, onChange, ...field }) => (
                        <Input type="number" onChange={(e) => onChange(parseInt(e.target.value) ?? 0)} {...field} />
                    )} />
                <InputField
                    form={form}
                    name="villageNo"
                    label="หมู่ที่"
                    render={({ value, onChange, ...field }) => (
                        <Input type="number" onChange={(e) => onChange(parseInt(e.target.value) ?? 0)} {...field} />
                    )} />
                <InputField
                    form={form}
                    name="village"
                    label="หมู่บ้าน"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="road"
                    label="ถนน"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="alley"
                    label="ตรอก/ซอย"
                    render={(field) => (
                        <Input {...field} />
                    )} />
                <InputField
                    form={form}
                    name="province"
                    label="จังหวัด"
                    render={(field, open, setOpen) => (
                        <InputCommand
                            placeholder="เลือกจังหวัด"
                            field={field}
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <Command>
                                <CommandInput
                                    placeholder="ค้นหาจังหวัด..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>ไม่พบผลการค้นหา</CommandEmpty>
                                    <CommandGroup>
                                        {province.map((province, index) => (
                                            <CommandItem
                                                key={index}
                                                value={province.name_th}
                                                onSelect={(value) => { field.onChange(value); setOpen(false) }}
                                            >
                                                {province.name_th} - {province.name_en}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </InputCommand>
                    )} />
                <InputField
                    form={form}
                    name="district"
                    label="อําเภอ"
                    render={(field, open, setOpen) => (
                        <InputCommand
                            placeholder="เลือกอําเภอ"
                            field={field}
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <Command>
                                <CommandInput
                                    placeholder="ค้นหาอําเภอ..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>ไม่พบผลการค้นหา</CommandEmpty>
                                    <CommandGroup>
                                        {district.map((district, index) => (
                                            <CommandItem
                                                key={index}
                                                value={district.name_th}
                                                onSelect={(value) => { field.onChange(value); setOpen(false) }}
                                            >
                                                {district.name_th} - {district.name_en}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </InputCommand>
                    )} />
                <InputField
                    form={form}
                    name="subDistrict"
                    label="ตําบล"
                    render={(field, open, setOpen) => (
                        <InputCommand
                            placeholder="เลือกตําบล"
                            field={field}
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <Command>
                                <CommandInput
                                    placeholder="ค้นหาตําบล..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>ไม่พบผลการค้นหา</CommandEmpty>
                                    <CommandGroup>
                                        {subDistrict.map((subDistrict, index) => (
                                            <CommandItem
                                                key={index}
                                                value={subDistrict.name_th}
                                                onSelect={(value) => { field.onChange(value); setOpen(false) }}
                                            >
                                                {subDistrict.name_th} - {subDistrict.name_en}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </InputCommand>
                    )} />
                <InputField
                    form={form}
                    name="zipcode"
                    label="รหัสไปรษณีย์"
                    render={({ value, ...field }) => (
                        <Input value={value ?? ""} {...field} readOnly />
                    )} />
            </div>
        </div>
    )
}