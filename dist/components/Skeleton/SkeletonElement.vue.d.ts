export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export interface SkeletonElementProps {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    animated?: boolean;
}
declare const _default: import('vue').DefineComponent<SkeletonElementProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SkeletonElementProps> & Readonly<{}>, {
    variant: SkeletonVariant;
    animated: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=SkeletonElement.vue.d.ts.map