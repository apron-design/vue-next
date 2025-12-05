export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
export interface InputProps {
    modelValue?: string;
    type?: InputType;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    prepend?: string;
    append?: string;
}
declare const _default: import('vue').DefineComponent<InputProps, {
    focus: () => void | undefined;
    blur: () => void | undefined;
    select: () => void | undefined;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    clear: () => any;
    "update:modelValue": (value: string) => any;
    change: (value: string) => any;
    blur: (event: FocusEvent) => any;
    focus: (event: FocusEvent) => any;
}, string, import('vue').PublicProps, Readonly<InputProps> & Readonly<{
    onClear?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
}>, {
    type: InputType;
    disabled: boolean;
    clearable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    inputRef: HTMLInputElement;
}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Input.vue.d.ts.map