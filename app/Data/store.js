import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { eventsMiddleware } from 'Data/Middleware/events';
import reducers from 'Data/Reducers/reducers';
import rootSaga from 'Data/Sagas/sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware, eventsMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export default store;
