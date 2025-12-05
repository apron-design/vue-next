import { ButtonProps } from '../Button/Button.vue';
export interface ResponsiveModalProps {
    open?: boolean;
    title?: string;
    closable?: boolean;
    closeByOverlay?: boolean;
    width?: string | number;
    okText?: string;
    cancelText?: string;
    okButtonProps?: Partial<ButtonProps>;
    cancelButtonProps?: Partial<ButtonProps>;
    showCancel?: boolean;
    breakpoint?: number;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        header?(_: {}): any;
        default?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ResponsiveModalProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    cancel: () => any;
    close: () => any;
    "update:open": (value: boolean) => any;
    ok: () => any;
    afterOpenChange: (open: boolean) => any;
}, string, import('vue').PublicProps, Readonly<ResponsiveModalProps> & Readonly<{
    onCancel?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    onOk?: (() => any) | undefined;
    onAfterOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    width: string | number;
    open: boolean;
    closable: boolean;
    closeByOverlay: boolean;
    okText: string;
    cancelText: string;
    showCancel: boolean;
    breakpoint: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=ResponsiveModal.vue.d.ts.map