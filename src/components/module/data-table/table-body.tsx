import { TableBody, TableCell, TableRow } from "../../ui/table"
import { DataTableColumn, DataTablePagination, ColumnKey } from "./table-types"
import { getValueByPath, searchInNestedObject, sortByNestedProperty } from "./table-utils"

interface TableBodyProps<V extends Record<string, unknown>> {
    columns: DataTableColumn<V>[]
    visibleColumns: ColumnKey<V>[]
    data: V[]
    sort: { key: ColumnKey<V>; order: "asc" | "desc" } | null
    pagination: DataTablePagination
    serverSide?: boolean
    isLoading?: boolean
}

export function DataTableBody<V extends Record<string, unknown>>({
    columns,
    visibleColumns,
    data,
    sort,
    pagination,
    serverSide,
    isLoading,
}: TableBodyProps<V>) {
    let displayData = data

    // Apply search filter for non-server-side tables
    if (!serverSide && pagination.search) {
        const searchableFields = columns
            .filter(col => col.isSearchable !== false)
            .map(col => String(col.key));

        displayData = displayData.filter(item =>
            searchInNestedObject(item, pagination.search, searchableFields)
        );
    }

    // Apply sorting for non-server-side tables
    if (!serverSide && sort) {
        displayData = sortByNestedProperty(displayData, String(sort.key), sort.order);
    }

    // Apply pagination for non-server-side tables
    if (!serverSide) {
        displayData = displayData.slice(
            (pagination.page - 1) * pagination.pageSize,
            pagination.page * pagination.pageSize
        );
    }

    const getCellValue = (item: V, index: number, column: DataTableColumn<V>): React.ReactNode => {
        if (column.render) {
            return column.render(item, index + (pagination.page - 1) * pagination.pageSize);
        }

        const value = typeof column.key === 'string' && column.key.includes('.')
            ? getValueByPath(item, column.key)
            : item[column.key as keyof V];

        if (value === null || value === undefined) {
            return "";
        }

        // Handle arrays
        if (Array.isArray(value)) {
            return value.join(", ");
        }

        // Handle objects
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        // Handle dates
        if (value instanceof Date) {
            return value.toLocaleDateString('th-TH');
        }

        return String(value);
    };

    return (
        <TableBody>
            {isLoading ? (
                <TableRow>
                    <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                        <svg
                            className="mr-2 inline h-4 w-4 animate-spin text-muted-foreground"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        กำลังโหลด...
                    </TableCell>
                </TableRow>
            ) : displayData.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={visibleColumns.length} className="h-24 text-center">
                        ไม่พบข้อมูล
                    </TableCell>
                </TableRow>
            ) : displayData.map((item, index) => (
                <TableRow key={index}>
                    {columns
                        .filter((column) => visibleColumns.includes(column.key))
                        .map((column, colIndex) => (
                            <TableCell key={colIndex} className="whitespace-nowrap">
                                {getCellValue(item, index, column)}
                            </TableCell>
                        ))}
                </TableRow>
            ))}
        </TableBody>
    )
}