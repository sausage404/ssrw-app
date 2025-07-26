"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import React from "react"
import { Announcement } from "@prisma/client"
import { useDialogData } from "@/hooks/use-dialog-data"
import DialogDelete from "./components/dialog-delete"
import DialogCreate from "./components/dialog-create"
import { useSession } from "next-auth/react"

export default ({ announcements }: { announcements: Announcement[] }) => {
    const { data } = useSession();

    const deleteDialog = useDialogData<Announcement>();
    const dataIsSummarize = announcements.filter((item) => item.isSummarize);
    const dataIsNotSummarize = announcements.filter((item) => !item.isSummarize);

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8 space-y-4">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    ประชาสัมพันธ์
                </h1>
                <div className="flex gap-4">
                    {data?.user?.role !== "STUDENT" && <DialogCreate />}
                    {deleteDialog.data && <DialogDelete {...{ ...deleteDialog, data: deleteDialog.data }} />}
                </div>
            </div>
            <div className="w-full p-6 md:grid-cols-2 grid gap-4 sm:gap-8">
                <div>
                    <p className="text-muted-foreground flex gap-2 items-center">สรุปหน้าเสาธง</p>
                    <Accordion defaultValue={dataIsNotSummarize[0]?.id} type="single" collapsible>
                        {dataIsNotSummarize.filter(item => !item.isSummarize).map(item => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger>
                                    {item.occurredAt.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {item.description}
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="float-end text-red-500 "
                                        onClick={() => {
                                            deleteDialog.setData(item);
                                            deleteDialog.onOpenChange(true);
                                        }}
                                    >
                                        ลบ
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                <div>
                    <p className="text-muted-foreground flex gap-2 items-center">ประชาสัมพันธ์</p>
                    <Accordion defaultValue={dataIsSummarize[0]?.id} type="single" collapsible>
                        {dataIsSummarize.filter(item => item.isSummarize).map(item => (
                            <AccordionItem key={item.id} value={item.id}>
                                <AccordionTrigger>{item.occurredAt.toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric" })}</AccordionTrigger>
                                <AccordionContent>
                                    {item.description}
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="float-end text-red-500 "
                                        onClick={() => {
                                            deleteDialog.setData(item);
                                            deleteDialog.onOpenChange(true);
                                        }}
                                    >
                                        ลบ
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}