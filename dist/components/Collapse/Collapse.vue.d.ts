import { InjectionKey } from 'vue';
export interface CollapseProps {
    modelValue?: string[];
    defaultActiveKeys?: string[];
    accordion?: boolean;
}
export interface CollapseContext {
    activeKeys: string[];
    toggleItem: (key: string) => void;
}
export declare const collapseContextKey: InjectionKey<CollapseContext>;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<CollapseProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string[]) => any;
    change: (value: string[]) => any;
}, string, import('vue').PublicProps, Readonly<CollapseProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string[]) => any) | undefined;
    onChange?: ((value: string[]) => any) | undefined;
}>, {
    defaultActiveKeys: string[];
    accordion: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Collapse.vue.d.ts.map