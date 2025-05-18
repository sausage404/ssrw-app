"use client"

import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export default ({ className, ...props }: InputPasswordProps) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-10', className)}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 opacity-50" aria-hidden="true" />
                ) : (
                    <Eye className="h-4 w-4 opacity-50" aria-hidden="true" />
                )}
            </Button>
        </div>
    )
}