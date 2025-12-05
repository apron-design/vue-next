import { Component } from 'vue';
export type SpinPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';
export interface SpinProps {
    loading?: boolean;
    text?: string;
    icon?: Component;
    placement?: SpinPlacement;
    fullscreen?: boolean;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<{
        default?: () => any;
        icon?: () => any;
    }> & {
        default?: () => any;
        icon?: () => any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<SpinProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SpinProps> & Readonly<{}>, {
    loading: boolean;
    placement: SpinPlacement;
    fullscreen: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Spin.vue.d.ts.map