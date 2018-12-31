import { applyMiddleware, createStore } from 'redux';
import reducers from 'Data/Reducers/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'Data/Sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
