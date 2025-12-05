export interface CascaderOption {
    label: string;
    value: string | number;
    disabled?: boolean;
    children?: CascaderOption[];
}
export interface CascaderProps {
    modelValue?: (string | number)[];
    options?: CascaderOption[];
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    inflow?: boolean;
    separator?: string;
    changeOnSelect?: boolean;
}
declare const _default: import('vue').DefineComponent<CascaderProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: (string | number)[]) => any;
    change: (value: (string | number)[], selectedOptions: CascaderOption[]) => any;
    openChange: (open: boolean) => any;
}, string, import('vue').PublicProps, Readonly<CascaderProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: (string | number)[]) => any) | undefined;
    onChange?: ((value: (string | number)[], selectedOptions: CascaderOption[]) => any) | undefined;
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    loading: boolean;
    disabled: boolean;
    options: CascaderOption[];
    placeholder: string;
    inflow: boolean;
    separator: string;
    changeOnSelect: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    cascaderRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Cascader.vue.d.ts.map