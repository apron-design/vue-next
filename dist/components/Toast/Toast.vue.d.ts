import { Component } from 'vue';
export type ToastType = 'success' | 'fail' | 'danger' | 'loading';
export interface ToastProps {
    visible?: boolean;
    type?: ToastType;
    text?: string;
    icon?: Component;
    duration?: number;
}
declare const _default: import('vue').DefineComponent<ToastProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    close: () => any;
    "update:visible": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<ToastProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
}>, {
    type: ToastType;
    duration: number;
    visible: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=Toast.vue.d.ts.map