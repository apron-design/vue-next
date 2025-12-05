import { InjectionKey } from 'vue';
export type FormLayout = 'horizontal' | 'vertical' | 'inline';
export type LabelAlign = 'left' | 'right';
export interface FormRule {
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    pattern?: RegExp;
    validator?: (value: any) => boolean | Promise<boolean>;
}
export interface FormInstance {
    validate: () => Promise<boolean>;
    validateField: (name: string) => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (names?: string | string[]) => void;
    getFieldValue: (name: string) => any;
    getFieldsValue: () => Record<string, any>;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: Record<string, any>) => void;
}
export interface FormContext {
    values: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    validating: Record<string, boolean>;
    layout: FormLayout;
    floatingLabel: boolean;
    labelWidth: string | number | undefined;
    labelAlign: LabelAlign;
    disabled: boolean;
    setFieldValue: (name: string, value: any) => void;
    setFieldTouched: (name: string, touched: boolean) => void;
    validateField: (name: string, rules?: FormRule[]) => Promise<boolean>;
    clearFieldError: (name: string) => void;
    registerField: (name: string, rules?: FormRule[]) => void;
    unregisterField: (name: string) => void;
}
export declare const formContextKey: InjectionKey<FormContext>;
export interface FormProps {
    layout?: FormLayout;
    floatingLabel?: boolean;
    labelWidth?: string | number;
    labelAlign?: LabelAlign;
    disabled?: boolean;
    initialValues?: Record<string, any>;
}
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<FormProps, {
    validate: () => Promise<boolean>;
    validateField: (name: string) => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (names?: string | string[]) => void;
    getFieldValue: (name: string) => any;
    getFieldsValue: () => Record<string, any>;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: Record<string, any>) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    finish: (values: Record<string, any>) => any;
    finishFailed: (errors: Record<string, string>) => any;
    valuesChange: (changedValues: Record<string, any>, allValues: Record<string, any>) => any;
}, string, import('vue').PublicProps, Readonly<FormProps> & Readonly<{
    onFinish?: ((values: Record<string, any>) => any) | undefined;
    onFinishFailed?: ((errors: Record<string, string>) => any) | undefined;
    onValuesChange?: ((changedValues: Record<string, any>, allValues: Record<string, any>) => any) | undefined;
}>, {
    disabled: boolean;
    layout: FormLayout;
    floatingLabel: boolean;
    labelAlign: LabelAlign;
    initialValues: Record<string, any>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLFormElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Form.vue.d.ts.map