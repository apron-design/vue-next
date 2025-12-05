export type SwitchSize = 'default' | 'small' | 'mini';
export type SwitchVariant = 'default' | 'primary' | 'secondary';
export interface SwitchProps {
    modelValue?: boolean;
    disabled?: boolean;
    size?: SwitchSize;
    variant?: SwitchVariant;
    checkedColor?: string;
    uncheckedColor?: string;
}
declare const _default: import('vue').DefineComponent<SwitchProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    change: (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<SwitchProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onChange?: ((value: boolean) => any) | undefined;
}>, {
    size: SwitchSize;
    variant: SwitchVariant;
    disabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLLabelElement>;
export default _default;
//# sourceMappingURL=Switch.vue.d.ts.map