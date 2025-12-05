import { default as Spin } from './Spin.vue';
import { SpinService } from './spin';
declare const SpinWithService: typeof Spin & {
    show: typeof SpinService.show;
    close: typeof SpinService.close;
};
export { Spin, SpinService };
export type { SpinProps, SpinPlacement } from './Spin.vue';
export type { SpinOptions } from './spin';
export default SpinWithService;
//# sourceMappingURL=index.d.ts.map