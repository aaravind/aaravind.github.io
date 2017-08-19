import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {AppContainer} from './containers/AppContainer';
import StartForm from './views/startform';
import Rides from './views/rides';
const routes = {
	path: '/',
	component: AppContainer,
	indexRoute: { onEnter: (nextState, replace) => replace('/register') },
	childRoutes: [
		{
	      path: 'login',
	      indexRoute: { component: StartForm }
		},
		{
	      path: 'register',
	      indexRoute: { component: StartForm }
		},
		{
		  path: 'rides',
	      indexRoute: { component: Rides }
		},
		{
	      path: '*',
	      indexRoute: { component: StartForm }
		}
	]
};

export default routes;
