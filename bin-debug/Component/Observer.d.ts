/**
 * 观察者
 * 1、用于管理组件间的通讯，具体来说即功能按钮与暴露这些功能组件之间的通讯，包括：reset、answer、start
 */
declare class Observer {
    static getInstance(): Observer;
    private static instance;
    private subscribers;
    register(subscriberName: string, event: Function): void;
    emit(subscriberName: string): void;
    remove(subscriberName: string, event: Function): void;
    clear(): void;
}
