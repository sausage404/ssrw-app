"use client";

import React from "react";
import InputCommand from "@/components/input-command";
import InputField from "@/components/input-field";
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
            form.getValues("provinceOld")
        ).then((res) => setDistrict(res));
        getSubDistricts(
            form.getValues("provinceOld"),
            form.getValues("districtOld")
        ).then((res) => setSubDistrict(res));
        getZipCode(
            form.getValues("provinceOld"),
            form.getValues("districtOld"),
            form.getValues("subDistrictOld")
        ).then((res) => {
            form.setValue("zipcodeOld", res.toString());
        })
    }, [
        form.watch("provinceOld"),
        form.watch("districtOld"),
        form.watch("subDistrictOld")
    ])

    return (
        <div className="container mx-auto py-4 px-3 border-b border-dashed">
            <p className="font-semibold text-lg mb-3">การศึกษาก่อนหน้า</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                <InputField
                    form={form}
                    name="schoolName"
                    label="ชื่อโรงเรียนเดิม"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
                <InputField
                    form={form}
                    name="provinceOld"
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
                    name="districtOld"
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
                    name="subDistrictOld"
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
                    name="zipcodeOld"
                    label="รหัสไปรษณีย์"
                    render={({ value, ...field }) => (
                        <Input value={value ?? ""} {...field} readOnly />
                    )} />
                <InputField
                    form={form}
                    name="grade"
                    label="เกรดเฉลี่ย"
                    render={(field) => (
                        <Input {...field} />
                    )}
                />
            </div>
        </div>
    )
}