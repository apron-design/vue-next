export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export interface ImageProps {
    src?: string;
    alt?: string;
    fit?: ImageFit;
    fallback?: string;
    preview?: boolean;
    width?: string | number;
    height?: string | number;
}
declare const _default: import('vue').DefineComponent<ImageProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    error: (event: Event) => any;
    load: (event: Event) => any;
}, string, import('vue').PublicProps, Readonly<ImageProps> & Readonly<{
    onError?: ((event: Event) => any) | undefined;
    onLoad?: ((event: Event) => any) | undefined;
}>, {
    fit: ImageFit;
    preview: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Image.vue.d.ts.map