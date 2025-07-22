import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from '../ui/calendar';
import { th } from 'date-fns/locale'

interface ThaiCalendarPopoverProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    disabled?: boolean;
    className?: string;
    label: string;
}

export function ThaiCalendarPopover({ value, onChange, disabled = false, className, label }: ThaiCalendarPopoverProps) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between text-left font-normal px-3 py-1",
                        !value && "text-muted-foreground",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    disabled={disabled}
                >
                    {value ? value.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }) : <span>{label}</span>}
                    <CalendarIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    captionLayout="dropdown"
                    locale={th}
                    className="rounded-lg border"
                    disabled={disabled}
                />
            </PopoverContent>
        </Popover>
    );
}
