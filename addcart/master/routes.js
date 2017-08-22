import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {AppContainer} from './containers/AppContainer';
import ProductsList from './views/productsList';
import CartList from './views/cartList';
const routes = {
	path: '/',
	component: AppContainer,
	indexRoute: { onEnter: (nextState, replace) => replace('/products') },
	childRoutes: [
		{
		  path: 'products',
	      indexRoute: { component: ProductsList }
		},
		{
		  path: 'cart',
	      indexRoute: { component: CartList }
		},
		{
	      path: '*',
	      indexRoute: { component: ProductsList }
		}
	]
};

export default routes;
