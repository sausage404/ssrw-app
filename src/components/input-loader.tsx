'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface InputLoaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export default ({ className, ...props }: InputLoaderProps) => {
    return (
        <div className="relative">
            <Input className={cn('pr-10', className)} {...props} />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled
                className="absolute inset-y-0 right-0 h-full hover:bg-transparent"
            >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-white" />
            </Button>
        </div>
    )
}