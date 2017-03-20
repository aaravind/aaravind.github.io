import {combineReducers} from 'redux';
import filters from './FiltersReducer';
import tourslist from './ToursListReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
 filters,
 tourslist,
 routing: routerReducer,
});

export default rootReducer;