import React from 'react';
import { th } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ControllerRenderProps } from 'react-hook-form';

interface ThaiCalendarBaseProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    field?: ControllerRenderProps<any, any>;
    disabled?: boolean;
}

export function ThaiCalendarBase({ value, onChange, field, disabled = false }: ThaiCalendarBaseProps) {
    const years = React.useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from(
            { length: 21 },
            (_, i) => {
                const year = currentYear - 20 + i;
                return {
                    value: year.toString(),
                    label: (year + 543).toString()
                };
            }
        );
    }, []);

    const months = [
        { value: "0", label: "มกราคม" },
        { value: "1", label: "กุมภาพันธ์" },
        { value: "2", label: "มีนาคม" },
        { value: "3", label: "เมษายน" },
        { value: "4", label: "พฤษภาคม" },
        { value: "5", label: "มิถุนายน" },
        { value: "6", label: "กรกฎาคม" },
        { value: "7", label: "สิงหาคม" },
        { value: "8", label: "กันยายน" },
        { value: "9", label: "ตุลาคม" },
        { value: "10", label: "พฤศจิกายน" },
        { value: "11", label: "ธันวาคม" }
    ];

    const handleYearChange = (year: string): void => {
        const newDate = new Date(getCurrentValue() ?? new Date());
        newDate.setFullYear(parseInt(year));
        updateValue(newDate);
    };

    const handleMonthChange = (monthIndex: string): void => {
        const newDate = new Date(getCurrentValue() ?? new Date());
        newDate.setMonth(parseInt(monthIndex));
        updateValue(newDate);
    };

    const getCurrentValue = (): Date | undefined => {
        return field ? field.value : value;
    };

    const updateValue = (newDate: Date | undefined) => {
        if (field) {
            field.onChange(newDate);
        } else if (onChange) {
            onChange(newDate);
        }
    };

    const currentValue = getCurrentValue();

    return (
        <>
            <div className="flex gap-2 pt-3 px-3">
                <Select
                    value={
                        currentValue?.getMonth().toString() ||
                        new Date().getMonth().toString()
                    }
                    onValueChange={handleMonthChange}
                    disabled={disabled}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="เดือน" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={
                        currentValue?.getFullYear().toString() ??
                        new Date().getFullYear().toString()
                    }
                    onValueChange={handleYearChange}
                    disabled={disabled}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="ปี" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                                {year.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Calendar
                mode="single"
                selected={currentValue}
                onSelect={updateValue}
                month={currentValue ?? new Date()}
                initialFocus
                locale={th}
                disabled={disabled}
            />
        </>
    );
}
