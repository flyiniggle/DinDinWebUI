import uuid from 'Business/Lib/uuid';


interface IReduxEventListener {
    type: string
    handler: (action: string, state: object) => any
    async?: boolean
} 

class ReduxEvents {
    private listeners = {};

    registerListener = (eventListener: IReduxEventListener): () => void => {
        const type = eventListener.type;
        const id = uuid();

        if (!(type in this.listeners)) {
            this.listeners[type] = {};
        }

        this.listeners[type][id] = eventListener;

        return function () {
            delete this.listeners[type][id];
        }
    }

    createReduxMiddleware() {
        return store => next => action => {
            Object.entries(this.listeners)
                .filter(([registeredAction]) =>  action.type === registeredAction)
                .forEach(([, listenerMap]) => {
                    Object.values(listenerMap)
                        .forEach((listener: IReduxEventListener) => {
                            try {
                                if (listener.async) {
                                    setTimeout(() => listener.handler(action, store.getState()));
                                } else {
                                    listener.handler(action, store.getState());
                                }
                            } catch (e) {
                                console.error(`redux event error handling ${action.type}.`);
                            }
                        })
                });

            return next(action);
        };
    }
}

export const events = new ReduxEvents();
export const eventsMiddleware = events.createReduxMiddleware();