import { createStore, applyMiddleware, compose } from 'redux';
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

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;

    const store = createStore(
        createRootReducer(history),
        composeEnhancers(applyMiddleware(...middlewares))
    );

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(createRootReducer(history))
        );
    }
    sagaMiddleware.run(rootSaga)
    return store;
};
