import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers';


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga)
    return store;
};
