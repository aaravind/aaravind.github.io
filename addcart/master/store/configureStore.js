import {createStore, applyMiddleware} from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import reduxImmutableStateInvarient from 'redux-immutable-state-invariant';


const routeMiddleware = routerMiddleware(browserHistory);

const middleware = [routeMiddleware, thunk, reduxImmutableStateInvarient()];

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(...middleware)
    );
}