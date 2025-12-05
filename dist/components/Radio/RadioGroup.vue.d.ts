export type RadioDirection = 'horizontal' | 'vertical';
export interface RadioOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface RadioGroupProps {
    modelValue?: string | number;
    options?: RadioOption[];
    disabled?: boolean;
    direction?: RadioDirection;
    labelClickable?: boolean;
    name?: string;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<RadioGroupProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string | number) => any;
    change: (value: string | number) => any;
}, string, import('vue').PublicProps, Readonly<RadioGroupProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    onChange?: ((value: string | number) => any) | undefined;
}>, {
    disabled: boolean;
    labelClickable: boolean;
    direction: RadioDirection;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=RadioGroup.vue.d.ts.map