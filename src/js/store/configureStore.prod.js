import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import rootSaga from '../sagas'
import createRootReducer from '../reducers';


export default function configureStore(history) {
    const sagaMiddleware = createSagaMiddleware()

    const middlewares = [
        thunk,
        sagaMiddleware,
        routerMiddleware(history)
    ]

    const store = createStore(
        createRootReducer(history),
        applyMiddleware(...middlewares)
    );
    sagaMiddleware.run(rootSaga)
    return store;
};
