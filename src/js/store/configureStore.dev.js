import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'
import rootReducer from '../reducers';


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()

    const middlewares = [
        thunk,
        sagaMiddleware
    ]

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    // Hot reload reducers (Vite HMR)
    if (import.meta.hot) {
        import.meta.hot.accept('../reducers', (newModule) => {
            if (newModule) {
                store.replaceReducer(newModule.default)
            }
        });
    }
    sagaMiddleware.run(rootSaga)
    return store;
};
