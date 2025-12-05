import { Component } from 'vue';
export type ToastType = 'success' | 'fail' | 'danger' | 'loading';
export interface ToastOptions {
    type?: ToastType;
    text?: string;
    icon?: Component;
    duration?: number;
}
export declare const Toast: {
    show: (options: ToastOptions | string) => void;
    close: () => void;
    success: (text: string, duration?: number) => void;
    fail: (text: string, duration?: number) => void;
    danger: (text: string, duration?: number) => void;
    loading: (text?: string) => void;
};
export default Toast;
//# sourceMappingURL=toast.d.ts.map