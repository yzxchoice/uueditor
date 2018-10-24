
class Observer {
    static getInstance(): Observer {
        if(!this.instance) {
            this.instance = new this;
        }
        return this.instance;
    }

    private static instance: Observer | null = null;

    // private subscribers: { subscriberName: string, eventList: Function[] }[] = [];
    private subscribers: { [key: string]: Function[] } = {};

    register(subscriberName: string, event: Function): void {
        if(!this.subscribers[subscriberName]) {
            this.subscribers[subscriberName] = [];
        }
        this.subscribers[subscriberName].push(event);
    }

    emit(subscriberName: string): void {
        if(!this.subscribers[subscriberName]) return;
        this.subscribers[subscriberName].forEach(fn => fn());
    }

    remove(subscriberName: string, event: Function): void {
        if(!this.subscribers[subscriberName]) return;
        for(let i = 0, len = this.subscribers[subscriberName].length; i < len; i++) {
            let fn = this.subscribers[subscriberName][i];
            if(fn == event) {
                this.subscribers[subscriberName].splice(i, 1);
                break;
            }
        }
    }

    clear(): void {
        this.subscribers = {};
    }
}