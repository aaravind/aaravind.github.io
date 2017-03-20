import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {AppContainer} from './containers/AppContainer';
import Tours from './views/tours';
//import Test from './containers/test/test';

const routes = {
	path: (location.href.search('localhost') == -1) ? '/' : '/dataweave_v6',
	component: AppContainer,
	indexRoute: { onEnter: (nextState, replace) => replace('/tours-trips') },
	childRoutes: [
		{
	      path: 'tours-trips',
	      indexRoute: { component: Tours }
		},
		{
	      path: '*',
	      indexRoute: { component: Tours }
		}
	]
};

export default routes;
