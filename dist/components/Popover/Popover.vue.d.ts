export type PopoverMode = 'click' | 'hover';
export interface PopoverProps {
    title?: string;
    content?: string;
    mode?: PopoverMode;
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
declare const __VLS_component: import('vue').DefineComponent<PopoverProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    openChange: (open: boolean) => any;
}, string, import('vue').PublicProps, Readonly<PopoverProps> & Readonly<{
    onOpenChange?: ((open: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    mode: PopoverMode;
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
//# sourceMappingURL=Popover.vue.d.ts.map