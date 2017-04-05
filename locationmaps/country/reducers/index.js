import {combineReducers} from 'redux';
import countrylist from './CountryListReducer';
import countrylocation from './CountryLocationReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
 countrylist,
 countrylocation,
 routing: routerReducer,
});

export default rootReducer;