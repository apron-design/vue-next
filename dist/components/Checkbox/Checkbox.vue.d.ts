import { InjectionKey } from 'vue';
export interface CheckboxProps {
    modelValue?: boolean;
    value?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    labelClickable?: boolean;
}
export interface CheckboxGroupContext {
    value: string[];
    disabled: boolean;
    labelClickable: boolean;
    onChange: (val: string, checked: boolean) => void;
}
export declare const checkboxGroupKey: InjectionKey<CheckboxGroupContext | null>;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<CheckboxProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    change: (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<CheckboxProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onChange?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    indeterminate: boolean;
    labelClickable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLLabelElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Checkbox.vue.d.ts.map