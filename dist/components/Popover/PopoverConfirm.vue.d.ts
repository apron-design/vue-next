export interface PopoverConfirmProps {
    title?: string;
    content?: string;
    okText?: string;
    cancelText?: string;
    disabled?: boolean;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        title?(_: {}): any;
        content?(_: {}): any;
    };
    refs: {
        triggerRef: HTMLSpanElement;
        popoverRef: HTMLDivElement;
    };
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<PopoverConfirmProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    openChange: (open: boolean) => any;
    cancel: () => any;
    confirm: () => any;
}, string, import('vue').PublicProps, Readonly<PopoverConfirmProps> & Readonly<{
    onOpenChange?: ((open: boolean) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
}>, {
    disabled: boolean;
    okText: string;
    cancelText: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    triggerRef: HTMLSpanElement;
    popoverRef: HTMLDivElement;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=PopoverConfirm.vue.d.ts.map