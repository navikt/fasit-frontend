import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers';


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()

    const middlewares = [
        thunk,
        sagaMiddleware
    ]

    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );
    sagaMiddleware.run(rootSaga)
    return store;
};
