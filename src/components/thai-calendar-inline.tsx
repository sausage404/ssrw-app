import React from 'react';
import { ThaiCalendarBase } from './thai-calendar-base';
import { ControllerRenderProps } from 'react-hook-form';

interface ThaiCalendarInlineProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    field?: ControllerRenderProps<any, any>;
    disabled?: boolean;
}

export function ThaiCalendarInline({ value, onChange, field, disabled = false }: ThaiCalendarInlineProps) {
    return (
        <div className="border rounded-md p-3">
            <ThaiCalendarBase
                value={value}
                onChange={onChange}
                field={field}
                disabled={disabled}
            />
        </div>
    );
}
