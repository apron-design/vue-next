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
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<ButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
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
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLButtonElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Button.vue.d.ts.map