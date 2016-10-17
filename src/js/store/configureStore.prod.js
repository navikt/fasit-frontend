import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducer from '../reducers';


const sagaMiddleware = createSagaMiddleware(rootSaga)
const middlewares = [
    thunk,
    sagaMiddleware
]

const finalCreateStore = compose(
    applyMiddleware(...middlewares)
)(createStore);

module.exports = function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
};
