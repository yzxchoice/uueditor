declare class Observer {
    static getInstance(): Observer;
    private static instance;
    private subscribers;
    register(subscriberName: string, event: Function): void;
    emit(subscriberName: string): void;
    remove(subscriberName: string, event: Function): void;
    clear(): void;
}
