import {combineReducers} from 'redux';
import productsList from './ProductsReducer';
import cartList from './CartReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
 productsList,
 cartList,
 routing: routerReducer,
});

export default rootReducer;