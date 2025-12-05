export interface TextareaProps {
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    clearable?: boolean;
    max?: number;
}
declare const _default: import('vue').DefineComponent<TextareaProps, {
    focus: () => void | undefined;
    blur: () => void | undefined;
    select: () => void | undefined;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    clear: () => any;
    "update:modelValue": (value: string) => any;
    change: (value: string) => any;
    blur: (event: FocusEvent) => any;
    focus: (event: FocusEvent) => any;
}, string, import('vue').PublicProps, Readonly<TextareaProps> & Readonly<{
    onClear?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
}>, {
    disabled: boolean;
    clearable: boolean;
    rows: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    textareaRef: HTMLTextAreaElement;
}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Textarea.vue.d.ts.map