import { InjectionKey } from 'vue';
export interface RadioProps {
    modelValue?: boolean;
    value?: string | number;
    disabled?: boolean;
    labelClickable?: boolean;
    name?: string;
}
export interface RadioGroupContext {
    value: string | number | undefined;
    name: string | undefined;
    disabled: boolean;
    labelClickable: boolean;
    onChange: (val: string | number) => void;
}
export declare const radioGroupKey: InjectionKey<RadioGroupContext | null>;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<RadioProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    change: (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<RadioProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onChange?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
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
//# sourceMappingURL=Radio.vue.d.ts.map