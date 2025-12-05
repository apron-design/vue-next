import { VNode } from 'vue';
export interface BadgeProps {
    dot?: boolean;
    count?: number;
    overflowCount?: number;
    content?: string | VNode;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Readonly<{
        default?: () => any;
        content?: () => any;
    }> & {
        default?: () => any;
        content?: () => any;
    };
    refs: {};
    rootEl: HTMLSpanElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<BadgeProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BadgeProps> & Readonly<{}>, {
    dot: boolean;
    overflowCount: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLSpanElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Badge.vue.d.ts.map