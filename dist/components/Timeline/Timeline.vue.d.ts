import { InjectionKey } from 'vue';
export interface TimelineProps {
    side?: TimelineSide;
}
export type TimelineSide = 'left' | 'right' | 'both';
export interface TimelineContext {
    side: TimelineSide;
}
export declare const timelineContextKey: InjectionKey<TimelineContext>;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<TimelineProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<TimelineProps> & Readonly<{}>, {
    side: TimelineSide;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Timeline.vue.d.ts.map