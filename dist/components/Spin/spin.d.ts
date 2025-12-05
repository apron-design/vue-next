import { Component } from 'vue';
export interface SpinOptions {
    text?: string;
    icon?: Component;
}
export declare const SpinService: {
    show: (options?: SpinOptions | string) => void;
    close: () => void;
};
export default SpinService;
//# sourceMappingURL=spin.d.ts.map