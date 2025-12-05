export type CheckboxDirection = 'horizontal' | 'vertical';
export interface CheckboxOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface CheckboxGroupProps {
    modelValue?: string[];
    options?: CheckboxOption[];
    disabled?: boolean;
    direction?: CheckboxDirection;
    labelClickable?: boolean;
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
declare const __VLS_component: import('vue').DefineComponent<CheckboxGroupProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string[]) => any;
    change: (value: string[]) => any;
}, string, import('vue').PublicProps, Readonly<CheckboxGroupProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
    onChange?: ((value: string[]) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: string[];
    labelClickable: boolean;
    direction: CheckboxDirection;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=CheckboxGroup.vue.d.ts.map