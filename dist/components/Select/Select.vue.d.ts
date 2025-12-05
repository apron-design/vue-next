export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface SelectProps {
    modelValue?: string | number;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    inflow?: boolean;
}
declare const _default: import('vue').DefineComponent<SelectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string | number | undefined) => any;
    change: (value: string | number | undefined) => any;
    openChange: (open: boolean) => any;
}, string, import('vue').PublicProps, Readonly<SelectProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number | undefined) => any) | undefined;
    onChange?: ((value: string | number | undefined) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    loading: boolean;
    disabled: boolean;
    options: SelectOption[];
    placeholder: string;
    inflow: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    selectRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Select.vue.d.ts.map