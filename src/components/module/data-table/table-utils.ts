import { ReadonlyURLSearchParams } from "next/navigation";
import { DataTablePagination } from "./table-types";

export type SearchParams = Record<keyof Omit<DataTablePagination, "total">, string>;

export const createPagination = (searchParams: ReadonlyURLSearchParams): DataTablePagination => {
    const page = searchParams.get("page")
    const pageSize = searchParams.get("pageSize")
    const search = searchParams.get("search")
    return {
        page: page && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        pageSize: pageSize && !isNaN(parseInt(pageSize)) ? parseInt(pageSize) : 10,
        search: search || "",
        total: 0
    }
}

export const getDataSlice = <T>(data: T[], pagination: DataTablePagination): T[] => {
    const startIndex = (pagination.page - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    return data.slice(startIndex, endIndex)
}

export const getTotalPages = (pagination: DataTablePagination): number => {
    return Math.ceil(pagination.total / pagination.pageSize)
}

export function getValueByPath<T>(obj: T, path: string): unknown {
    if (!obj || typeof obj !== 'object') return undefined;
    return path.split('.').reduce((acc: any, key: string) => {
        if (acc === null || acc === undefined) return undefined;
        if (key.includes('[') && key.includes(']')) {
            const [arrayKey, indexPart] = key.split('[');
            const index = parseInt(indexPart.replace(']', ''));
            if (acc[arrayKey] && Array.isArray(acc[arrayKey])) {
                return acc[arrayKey][index];
            }
            return undefined;
        }
        return acc[key];
    }, obj);
}

export function searchInNestedObject<T>(obj: T, searchValue: string, searchableFields: string[]): boolean {
    if (!searchValue) return true;
    const searchTerm = searchValue.toLowerCase();
    return searchableFields.some(field => {
        const value = getValueByPath(obj, field);
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm);
    });
}

export function sortByNestedProperty<T>(
    data: T[],
    sortKey: string,
    order: 'asc' | 'desc'
): T[] {
    return [...data].sort((a, b) => {
        const aValue = getValueByPath(a, sortKey);
        const bValue = getValueByPath(b, sortKey);
        if (aValue === bValue) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (typeof aValue === "number" && typeof bValue === "number") {
            return order === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (aValue instanceof Date && bValue instanceof Date) {
            return order === "asc"
                ? aValue.getTime() - bValue.getTime()
                : bValue.getTime() - aValue.getTime();
        }
        const aStr = String(aValue);
        const bStr = String(bValue);
        return order === "asc"
            ? aStr.localeCompare(bStr, 'th', { numeric: true })
            : bStr.localeCompare(aStr, 'th', { numeric: true });
    });
}