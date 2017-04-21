import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import allReducers from './reducers/reducerIndex';

let middleware;

if (process.env.NODE_ENV !== 'production') {
    middleware = applyMiddleware(promise(), thunk, logger);
}

if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware(promise(), thunk);
}

export default createStore(allReducers, middleware);
