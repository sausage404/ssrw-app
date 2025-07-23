import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "../../ui/dropdown-menu"
import { Settings2 } from "lucide-react"
import { DataTableColumn, ColumnKey } from "./table-types"

interface TableToolbarProps<V extends Record<string, unknown>> {
    columns: DataTableColumn<V>[]
    visibleColumns: ColumnKey<V>[]
    onVisibleColumnsChange: (columns: ColumnKey<V>[]) => void
    searchValue: string
    onSearch: (value: string) => void
    children?: React.ReactNode
    isSearchVisible?: boolean
}

export function DataTableToolbar<V extends Record<string, unknown>>({
    columns,
    visibleColumns,
    onVisibleColumnsChange,
    searchValue,
    isSearchVisible,
    onSearch,
    children,
}: TableToolbarProps<V>) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="max-w-lg w-full">
                {!isSearchVisible && (
                    <Input
                        placeholder="ค้นหา..."
                        defaultValue={searchValue}
                        className="w-full"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSearch(e.currentTarget.value)
                            }
                        }}
                    />
                )}
            </div>
            <div className="flex items-center space-x-2">
                {children}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings2 className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {columns.filter((column) => !column.isVisible).map((column, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                checked={visibleColumns.includes(column.key)}
                                onCheckedChange={(checked) =>
                                    onVisibleColumnsChange(
                                        checked
                                            ? [...visibleColumns, column.key]
                                            : visibleColumns.filter((key) => key !== column.key)
                                    )
                                }
                            >
                                {column.header}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
