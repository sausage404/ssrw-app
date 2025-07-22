"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ScrollArea, ScrollBar } from "../../ui/scroll-area"
import { Table } from "../../ui/table"
import { DataTableProps, ColumnKey } from "./table-types"
import { DataTableHeader } from "./table-header"
import { DataTableBody } from "./table-body"
import { DataTableToolbar } from "./table-toolbar"
import { DataTablePagination } from "./table-pagination"

export function DataTable<V extends Record<string, unknown>>({
    columns,
    data,
    children,
    pagination,
    onPageChange,
    isLoading,
    isSearchParams = false,
    onSearch,
    serverSide,
    isSearchVisible = false,
    isHeader = true,
}: DataTableProps<V>) {
    const [sort, setSort] = React.useState<{ key: ColumnKey<V>; order: "asc" | "desc" } | null>(null)
    const [visibleColumns, setVisibleColumns] = React.useState<ColumnKey<V>[]>(
        columns.map((column) => column.key)
    )

    const router = useRouter()

    const handleSort = (key: ColumnKey<V>) => {
        if (key === sort?.key) {
            setSort({
                key,
                order: sort.order === "asc" ? "desc" : "asc",
            })
        } else {
            setSort({ key, order: "asc" })
        }
    }

    const handleSearch = (search: string) => {
        if (!serverSide) {
            onPageChange && onPageChange({ ...pagination, page: 1, search })
            onSearch?.(search)
        }
        if (isSearchParams && serverSide) {
            router.push(`?page=1&pageSize=${pagination.pageSize}&search=${encodeURIComponent(search)}`)
        } else if (isSearchParams) {
            router.replace(`?page=1&pageSize=${pagination.pageSize}&search=${encodeURIComponent(search)}`)
        }
    }

    const handlePageChange = (page: number) => {
        if (!serverSide) {
            onPageChange && onPageChange({ ...pagination, page })
        }
        if (isSearchParams && serverSide) {
            router.push(`?page=${page}&pageSize=${pagination.pageSize}&search=${encodeURIComponent(pagination.search)}`)
        } else if (isSearchParams) {
            router.replace(`?page=${page}&pageSize=${pagination.pageSize}&search=${encodeURIComponent(pagination.search)}`)
        }
    }

    return (
        <div className="space-y-4">
            {isHeader && (
                <DataTableToolbar
                    columns={columns}
                    visibleColumns={visibleColumns}
                    onVisibleColumnsChange={setVisibleColumns}
                    searchValue={pagination.search || ""}
                    onSearch={handleSearch}
                    isSearchVisible={isSearchVisible}
                >
                    {children}
                </DataTableToolbar>
            )}

            <ScrollArea>
                <Table>
                    <DataTableHeader
                        columns={columns}
                        visibleColumns={visibleColumns}
                        sort={sort}
                        onSort={handleSort}
                    />
                    <DataTableBody
                        isLoading={isLoading}
                        serverSide={serverSide}
                        columns={columns}
                        visibleColumns={visibleColumns}
                        data={data}
                        sort={sort}
                        pagination={pagination}
                    />
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <DataTablePagination
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    )
}