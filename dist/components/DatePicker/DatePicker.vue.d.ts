export interface DateValue {
    year?: number;
    month?: number;
    day?: number;
}
export interface DatePickerProps {
    modelValue?: DateValue;
    disabled?: boolean;
    loading?: boolean;
    inflow?: boolean;
    yearStart?: number;
    yearEnd?: number;
    yearLabel?: string;
    monthLabel?: string;
    dayLabel?: string;
    monthLabels?: string[];
}
declare const _default: import('vue').DefineComponent<DatePickerProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: DateValue) => any;
    change: (value: DateValue) => any;
    openChange: (open: boolean) => any;
}, string, import('vue').PublicProps, Readonly<DatePickerProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: DateValue) => any) | undefined;
    onChange?: ((value: DateValue) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    loading: boolean;
    disabled: boolean;
    inflow: boolean;
    yearStart: number;
    yearEnd: number;
    yearLabel: string;
    monthLabel: string;
    dayLabel: string;
    monthLabels: string[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    pickerRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=DatePicker.vue.d.ts.map