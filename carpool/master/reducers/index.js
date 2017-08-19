import {combineReducers} from 'redux';
import app from './AppReducer';
import rides from './RideReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
 app,
 rides,
 routing: routerReducer,
});

export default rootReducer;