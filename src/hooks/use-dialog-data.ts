import React from "react"

export interface DialogData<T> {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: T
    setData: (data: T | undefined) => void
}

export function useDialogData<T>() {
    const [open, onOpenChange] = React.useState(false)
    const [data, setData] = React.useState<T | undefined>()
    return { open, onOpenChange, data, setData }
}