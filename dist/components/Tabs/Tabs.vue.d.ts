import { InjectionKey } from 'vue';
export interface TabsProps {
    modelValue?: string;
    defaultActiveKey?: string;
    capsule?: boolean;
}
export interface TabsContext {
    activeKey: string;
    setActiveKey: (key: string) => void;
}
export declare const tabsContextKey: InjectionKey<TabsContext>;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<TabsProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (value: string) => any;
    change: (value: string) => any;
}, string, import('vue').PublicProps, Readonly<TabsProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onChange?: ((value: string) => any) | undefined;
}>, {
    capsule: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=Tabs.vue.d.ts.map