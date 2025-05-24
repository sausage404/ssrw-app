import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ThaiCalendarBase } from './thai-calendar-base';
import { ControllerRenderProps } from 'react-hook-form';

interface ThaiCalendarPopoverProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    field?: ControllerRenderProps<any, any>;
    disabled?: boolean;
    className?: string;
    label: string;
}

export function ThaiCalendarPopover({ value, onChange, field, disabled = false, className, label }: ThaiCalendarPopoverProps) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

    const getCurrentValue = (): Date | undefined => {
        return field ? field.value : value;
    };

    const currentValue = getCurrentValue();

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between text-left font-normal px-3 py-1",
                        !currentValue && "text-muted-foreground",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    disabled={disabled}
                >
                    {currentValue ? currentValue.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }) : <span>{label}</span>}
                    <CalendarIcon className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <ThaiCalendarBase
                    value={value}
                    onChange={onChange}
                    field={field}
                    disabled={disabled}
                />
            </PopoverContent>
        </Popover>
    );
}
