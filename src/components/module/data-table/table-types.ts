import { ReactNode } from "react"

type NonNullableObject<T> = T extends null | undefined ? never : T;

type IsPlainObject<T> =
    NonNullableObject<T> extends object
    ? NonNullableObject<T> extends Function | Date | any[]
    ? false
    : true
    : false;

type NestedKeyOf<T> = {
    [K in keyof T & (string | number)]:
    IsPlainObject<T[K]> extends true
    ? `${K}.${NestedKeyOf<NonNullableObject<T[K]>>}`
    : `${K}`
}[keyof T & (string | number)];

export type ColumnKey<V extends Record<string, unknown>> = NestedKeyOf<V> | keyof V | (string & { _brand?: never });

export interface DataTableColumn<V extends Record<string, unknown>> {
    key: ColumnKey<V>
    header?: string
    render?: (value: V, index: number) => ReactNode
    isSortable?: boolean
    isSearchable?: boolean
    isVisible?: boolean
}

export interface DataTablePagination {
    page: number
    pageSize: number
    total: number
    search: string
}

export interface DataTableProps<V extends Record<string, unknown>> {
    pagination: DataTablePagination
    columns: DataTableColumn<V>[]
    data: V[]
    children?: ReactNode
    onSearch?: (search: string) => void
    onPageChange?: (pagination: DataTablePagination) => void
    isLoading?: boolean
    isSearchParams?: boolean
    isHeader?: boolean
    isSearchVisible?: boolean
    serverSide?: boolean
}