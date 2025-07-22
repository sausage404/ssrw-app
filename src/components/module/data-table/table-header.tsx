import { Button } from "../../ui/button"
import { TableHead, TableHeader, TableRow } from "../../ui/table"
import { ArrowDownZA, ArrowUpAZ, ArrowUpDown } from "lucide-react"
import { DataTableColumn, DataTablePagination, ColumnKey } from "./table-types"

interface TableHeaderProps<V extends Record<string, unknown>> {
    columns: DataTableColumn<V>[]
    visibleColumns: ColumnKey<V>[]
    sort: { key: ColumnKey<V>; order: "asc" | "desc" } | null
    onSort: (key: ColumnKey<V>) => void
}

export function DataTableHeader<V extends Record<string, unknown>>({
    columns,
    visibleColumns,
    sort,
    onSort,
}: TableHeaderProps<V>) {
    return (
        <TableHeader className="bg-muted">
            <TableRow>
                {columns
                    .filter((column) => visibleColumns.includes(column.key))
                    .map((column, index) => (
                        <TableHead key={index} className="whitespace-nowrap">
                            <div className="flex items-center justify-between">
                                {column.header}
                                {column.isSortable && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onSort(column.key)}
                                        className="w-6 h-6"
                                    >
                                        {sort && sort.key === column.key ? (
                                            sort.order === "asc" ? (
                                                <ArrowUpAZ className="w-4 h-4" />
                                            ) : (
                                                <ArrowDownZA className="w-4 h-4" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="w-4 h-4" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </TableHead>
                    ))}
            </TableRow>
        </TableHeader>
    )
}