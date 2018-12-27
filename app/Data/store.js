import { createStore } from 'redux';
import reducers from 'Data/Reducers/reducers';


export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);

    return store;
}