import { Component } from 'vue';
export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'text' | 'link';
export type ButtonSize = 'small' | 'middle' | 'large';
export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    dashed?: boolean;
    danger?: boolean;
    loading?: boolean;
    disabled?: boolean;
    block?: boolean;
    iconLeft?: Component;
    iconRight?: Component;
    disableRipple?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLButtonElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (event: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<ButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    type: "button" | "submit" | "reset";
    size: ButtonSize;
    variant: ButtonVariant;
    dashed: boolean;
    danger: boolean;
    loading: boolean;
    disabled: boolean;
    block: boolean;
    disableRipple: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Button.vue.d.ts.map