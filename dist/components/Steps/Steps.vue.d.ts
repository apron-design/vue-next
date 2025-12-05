export type StepStatus = 'completed' | 'current' | 'pending' | 'error';
export type LabelPlacement = 'top' | 'bottom' | 'both';
export interface StepItem {
    title: string;
    subtitle?: string;
    status?: StepStatus;
}
export interface StepsProps {
    items: StepItem[];
    current?: number;
    labelPlacement?: LabelPlacement;
}
declare const _default: import('vue').DefineComponent<StepsProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<StepsProps> & Readonly<{}>, {
    current: number;
    labelPlacement: LabelPlacement;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
//# sourceMappingURL=Steps.vue.d.ts.map