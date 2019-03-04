import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from 'Data/Reducers/reducers';
import rootSaga from 'Data/Sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export default store;
