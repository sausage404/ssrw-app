import React from "react"
import { useSearchParams } from "next/navigation"
import { createPagination } from "@/components/module/data-table/table-utils"

export function usePagination<T>() {
    const searchParams = useSearchParams();
    const params = React.useMemo(() => createPagination(searchParams), [searchParams]);
    const [pagination, setPagination] = React.useState(params);
    return { pagination, setPagination, params }
}