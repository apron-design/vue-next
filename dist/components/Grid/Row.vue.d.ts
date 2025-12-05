import { InjectionKey } from 'vue';
export interface RowProps {
    gutter?: Gutter;
    justify?: Justify;
    align?: Align;
    wrap?: boolean;
}
export type Gutter = number | [number, number] | {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
};
export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export type Align = 'top' | 'middle' | 'bottom' | 'stretch';
export interface RowContext {
    gutter: Gutter;
}
export declare const rowContextKey: InjectionKey<RowContext>;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<RowProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<RowProps> & Readonly<{}>, {
    align: Align;
    justify: Justify;
    gutter: Gutter;
    wrap: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Row.vue.d.ts.map