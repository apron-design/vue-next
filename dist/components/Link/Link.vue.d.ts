export type LinkVariant = 'primary' | 'secondary';
export type LinkUnderline = 'always' | 'hover' | 'never';
export interface LinkProps {
    variant?: LinkVariant;
    underline?: LinkUnderline;
    danger?: boolean;
    href?: string;
    target?: string;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLAnchorElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<LinkProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<LinkProps> & Readonly<{}>, {
    variant: LinkVariant;
    danger: boolean;
    underline: LinkUnderline;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLAnchorElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Link.vue.d.ts.map