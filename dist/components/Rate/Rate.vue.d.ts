export interface RateProps {
    modelValue?: number;
    count?: number;
    disabled?: boolean;
    allowHalf?: boolean;
    allowClear?: boolean;
}
declare const _default: import('vue').DefineComponent<RateProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: number) => any;
    change: (value: number) => any;
}, string, import('vue').PublicProps, Readonly<RateProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
    onChange?: ((value: number) => any) | undefined;
}>, {
    count: number;
    disabled: boolean;
    modelValue: number;
    allowHalf: boolean;
    allowClear: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Rate.vue.d.ts.map