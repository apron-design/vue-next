export interface InputOtpProps {
    modelValue?: string;
    length?: number;
    disabled?: boolean;
    password?: boolean;
}
declare const _default: import('vue').DefineComponent<InputOtpProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string) => any;
    change: (value: string) => any;
    complete: (value: string) => any;
}, string, import('vue').PublicProps, Readonly<InputOtpProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
    onComplete?: ((value: string) => any) | undefined;
}>, {
    length: number;
    disabled: boolean;
    modelValue: string;
    password: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=InputOtp.vue.d.ts.map