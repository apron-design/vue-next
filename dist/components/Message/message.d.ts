import { Component } from 'vue';
export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading';
export interface MessageOptions {
    type?: MessageType;
    content: string;
    duration?: number;
    icon?: Component;
}
export declare const Message: {
    show: (options: MessageOptions | string) => number;
    close: (id: number) => void;
    info: (content: string, duration?: number) => number;
    success: (content: string, duration?: number) => number;
    warning: (content: string, duration?: number) => number;
    error: (content: string, duration?: number) => number;
    loading: (content: string) => number;
};
export default Message;
//# sourceMappingURL=message.d.ts.map