import { Button } from "../../ui/button"
import { type DataTablePagination } from "./table-types"

interface TablePaginationProps {
    pagination: DataTablePagination
    onPageChange: (page: number) => void
}

export function DataTablePagination({
    pagination,
    onPageChange,
}: TablePaginationProps) {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize)
    const startEntry = (pagination.page - 1) * pagination.pageSize + 1
    const endEntry = Math.min(pagination.page * pagination.pageSize, pagination.total)

    return (
        <div className="flex md:flex-row flex-col items-center justify-between gap-3">
            <div className="flex-1 text-sm text-muted-foreground">
                แสดง{" "}
                <span className="font-medium">
                    {startEntry} ถึง {endEntry} จาก
                </span>{" "}
                {pagination.total} รายการ
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                    หน้า {pagination.page} จาก {totalPages}
                </span>
                <Button
                    onClick={() => onPageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    variant="outline"
                    size="sm"
                >
                    ก่อนหน้า
                </Button>
                <Button
                    onClick={() => onPageChange(pagination.page + 1)}
                    disabled={pagination.page >= totalPages}
                    variant="outline"
                    size="sm"
                >
                    ถัดไป
                </Button>
            </div>
        </div>
    )
}