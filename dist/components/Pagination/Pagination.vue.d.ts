export interface PaginationProps {
    current?: number;
    total?: number;
    pageSize?: number;
    showQuickJumper?: boolean;
    showTotal?: boolean;
    disabled?: boolean;
}
declare const _default: import('vue').DefineComponent<PaginationProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (page: number, pageSize: number) => any;
    "update:current": (page: number) => any;
}, string, import('vue').PublicProps, Readonly<PaginationProps> & Readonly<{
    onChange?: ((page: number, pageSize: number) => any) | undefined;
    "onUpdate:current"?: ((page: number) => any) | undefined;
}>, {
    disabled: boolean;
    current: number;
    total: number;
    pageSize: number;
    showQuickJumper: boolean;
    showTotal: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>;
export default _default;
//# sourceMappingURL=Pagination.vue.d.ts.map