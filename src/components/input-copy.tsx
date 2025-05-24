"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

interface InputCopyProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export default ({ className, ...props }: InputCopyProps) => {
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        if (copied) {

            navigator.clipboard.writeText(props.value as string);

            setTimeout(() => {
                setCopied(false);
            }, 1000);
        }
    }, [copied]);

    return (
        <div className="relative">
            <Input
                className={cn('pr-10', className)}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setCopied(true)}
                className="absolute inset-y-0 right-0 h-full px-3 py-2 hover:bg-transparent"
            >
                {copied ? (
                    <Check className="h-4 w-4 opacity-50" aria-hidden="true" />
                ) : (
                    <Copy className="h-4 w-4 opacity-50" aria-hidden="true" />
                )}
            </Button>
        </div>
    )
}