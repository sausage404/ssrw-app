"use client"

import React from "react"
import { EllipsisVertical } from "lucide-react"
import { Admission } from "@prisma/client"
import { useDialogData } from "@/hooks/use-dialog-data"
import { DataTableColumn } from "@/components/module/data-table/table-types"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import DialogDelete from "./components/dialog-delete"
import { DataTable } from "@/components/module/data-table"
import { usePagination } from "@/hooks/use-pagination"
import { getAdmissionCount, getAdmissions } from "@/data/admission"
import Link from "next/link"
import admissionForm from "@/schema/admission-form"
import { getFullName } from "@/lib/utils"

export default () => {

    const { pagination, setPagination, params } = usePagination();
    const [data, setData] = React.useState<Admission[]>([]);
    const [isPending, startTransition] = React.useTransition();

    const deleteDialog = useDialogData<Admission>();

    React.useEffect(() => {
        setPagination(params);

        startTransition(async () => {
            const skip = (params.page - 1) * params.pageSize;
            const take = params.pageSize;

            if (params.search.length > 0) {
                const data = await getAdmissions({
                    skip,
                    take,
                    where: {
                        OR: [
                            { firstName: { contains: params.search, mode: "insensitive" } },
                            { lastName: { contains: params.search, mode: "insensitive" } },
                            { cardId: { contains: params.search, mode: "insensitive" } },
                        ]
                    }
                });

                setPagination({
                    ...params,
                    total: data.length
                });
                setData(data);
            } else {
                const skip = (params.page - 1) * params.pageSize;
                const take = params.pageSize;

                const data = await getAdmissions({ skip, take });
                const total = await getAdmissionCount();

                setPagination({
                    ...params,
                    total
                });
                setData(data);
            }
        });
    }, [params]);

    const columns: DataTableColumn<Admission>[] = [
        {
            key: "id",
            header: "ไอดี"
        },
        {
            key: "academicYear",
            header: "ปีการศึกษา"
        },
        {
            key: "no",
            header: "ลำดับที่"
        },
        {
            key: "type",
            header: "ประเภท",
            render: (v) => admissionForm.typeView[v.type]
        },
        {
            key: "round",
            header: "รอบ",
            render: (v) => admissionForm.roundView[v.round]
        },
        {
            key: "class",
            header: "ระดับชั้น"
        },
        {
            key: "name",
            header: "ชื่อ",
            render: (user) => getFullName(user)
        },
        {
            key: "cardId",
            header: "เลขบัตรประชาชน"
        },
        {
            isVisible: true,
            key: "action",
            render: (v) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                            <EllipsisVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link target="_blank" href={`/preview/admission/${v.id}`}>
                                ดูข้อมูล
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setTimeout(() => {
                                deleteDialog.setData(v)
                                deleteDialog.onOpenChange(true)
                            }, 1)
                        }}>
                            ลบ
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ]

    return (
        <div className="container-fluid mx-auto w-full border-x border-dashed min-h-[83.9dvh]">
            <div className="border-b border-dashed p-8">
                <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.5]">
                    จัดการผู้ใช้งาน
                </h1>
            </div>
            <div className="w-full p-6">
                {deleteDialog.data && <DialogDelete {...{ ...deleteDialog, data: deleteDialog.data }} />}
                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={pagination}
                        isLoading={isPending}
                        isSearchParams
                        serverSide
                    />
                </div>
            </div>
        </div>
    )
}