import { ButtonProps } from '../Button/Button.vue';
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export interface DrawerProps {
    open?: boolean;
    title?: string;
    placement?: DrawerPlacement;
    closable?: boolean;
    closeByOverlay?: boolean;
    width?: string | number;
    height?: string | number;
    okText?: string;
    cancelText?: string;
    okButtonProps?: Partial<ButtonProps>;
    cancelButtonProps?: Partial<ButtonProps>;
    showCancel?: boolean;
    isMobile?: boolean;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<DrawerProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    cancel: () => any;
    close: () => any;
    "update:open": (value: boolean) => any;
    ok: () => any;
    afterOpenChange: (open: boolean) => any;
}, string, import('vue').PublicProps, Readonly<DrawerProps> & Readonly<{
    onCancel?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    onOk?: (() => any) | undefined;
    onAfterOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    width: string | number;
    height: string | number;
    open: boolean;
    placement: DrawerPlacement;
    closable: boolean;
    closeByOverlay: boolean;
    okText: string;
    cancelText: string;
    showCancel: boolean;
    isMobile: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Drawer.vue.d.ts.map