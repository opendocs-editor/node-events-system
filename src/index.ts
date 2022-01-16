interface EventData {
    [key: string]: unknown;
}

interface EventHandlerMap {
    [key: string]: {
        handlers: ((e: EventData) => void)[];
        data: EventData;
    };
}

interface EventArray {
    /**
     * @param key Name of the event.
     * @returns Description of the event.
     */
    [key: string]: string;
}

class EventSystem {
    private eventHandlers: EventHandlerMap;
    private events: EventArray;

    constructor() {
        this.events = {};
        this.eventHandlers = {};
    }

    on(event: string, handler: (e: EventData) => void) {
        if (!this.events[event])
            throw new ReferenceError("There is no such event!");
        this.eventHandlers[event].handlers.push(handler);
    }

    register(event: string, description: string) {
        this.events[event] = description;
        this.eventHandlers[event] = { data: {}, handlers: [] };
    }

    call(event: string, data: EventData) {
        if (!this.events[event])
            throw new ReferenceError("There is no such event!");
        this.eventHandlers[event].data = data;
        for (let i = 0; i < this.eventHandlers[event].handlers.length; i++) {
            this.eventHandlers[event].handlers[i](data);
        }
    }
}

export default EventSystem;
