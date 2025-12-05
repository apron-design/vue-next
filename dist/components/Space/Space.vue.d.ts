export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type SpaceOrientation = 'horizontal' | 'vertical';
export type SpaceSize = 'small' | 'middle' | 'large' | number;
export interface SpaceProps {
    align?: SpaceAlign;
    orientation?: SpaceOrientation;
    size?: SpaceSize;
    wrap?: boolean;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<SpaceProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SpaceProps> & Readonly<{}>, {
    size: SpaceSize;
    align: SpaceAlign;
    wrap: boolean;
    orientation: SpaceOrientation;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Space.vue.d.ts.map