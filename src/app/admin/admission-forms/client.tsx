"use client"

import React from "react"
import { EllipsisVertical } from "lucide-react"
import { AdmissionForm } from "@prisma/client"
import { useDialogData } from "@/hooks/use-dialog-data"
import { DataTableColumn } from "@/components/module/data-table/table-types"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import DialogCreate from "./components/dialog-create"
import DialogUpdate from "./components/dialog-update"
import DialogDelete from "./components/dialog-delete"
import { DataTable } from "@/components/module/data-table"
import { usePagination } from "@/hooks/use-pagination"
import { getAdmissionFormCount, getAdmissionForms } from "@/data/admission-form"

export default () => {

    const { pagination, setPagination, params } = usePagination();
    const [data, setData] = React.useState<AdmissionForm[]>([]);
    const [isPending, startTransition] = React.useTransition();

    const updateDialog = useDialogData<AdmissionForm>();
    const deleteDialog = useDialogData<AdmissionForm>();

    React.useEffect(() => {
        setPagination(params); // อัปเดต state เพื่อ sync กับ UI

        startTransition(async () => {
            const skip = (params.page - 1) * params.pageSize;
            const take = params.pageSize;

            const data = await getAdmissionForms({ skip, take });
            const total = await getAdmissionFormCount();

            setPagination({
                ...params,
                total
            });
            setData(data);
        });
    }, [params]);

    const columns: DataTableColumn<AdmissionForm>[] = [
        {
            key: "id",
            header: "ไอดี"
        },
        {
            key: "type",
            header: "ประเภท"
        },
        {
            key: "round",
            header: "รอบ"
        },
        {
            key: "class",
            header: "ระดับชั้น"
        },
        {
            key: "openedAt",
            header: "เปิด",
            render: (v) => v.openedAt.toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
        },
        {
            key: "closedAt",
            header: "ปิด",
            render: (v) => v.closedAt.toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
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
                        <DropdownMenuItem onClick={() => {
                            setTimeout(() => {
                                updateDialog.setData(v)
                                updateDialog.onOpenChange(true)
                            }, 1)
                        }}>
                            แก้ไข
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
                {updateDialog.data && <DialogUpdate {...{ ...updateDialog, data: updateDialog.data }} />}
                {deleteDialog.data && <DialogDelete {...{ ...deleteDialog, data: deleteDialog.data }} />}
                <div>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination={pagination}
                        isLoading={isPending}
                        isSearchVisible
                        isSearchParams
                        serverSide
                    >
                        <DialogCreate />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}