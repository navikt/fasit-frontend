import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import DevTools from '../components/DevTools/DevTools';

import rootSaga from '../sagas'
import rootReducer from '../reducers';


const sagaMiddleware = createSagaMiddleware()

const middlewares = [
    thunk,
    sagaMiddleware
]

const finalCreateStore = compose(
    applyMiddleware(...middlewares),
    DevTools.instrument()
)(createStore);

module.exports = function configureStore() {
    const store = finalCreateStore(rootReducer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }
    sagaMiddleware.run(rootSaga)
    return store;
};
