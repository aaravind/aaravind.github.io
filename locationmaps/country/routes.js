import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {AppContainer} from './containers/AppContainer';
import countryList from './views/countrylist';
import countryLocation from './views/countrylocation';

const routes = {
	path: (location.href.search('localhost') == -1) ? '/' : '/dataweave_v6',
	component: AppContainer,
	indexRoute: { onEnter: (nextState, replace) => replace('/country-list') },
	childRoutes: [
		{
	      path: 'country-list',
	      indexRoute: { component: countryList }
		},
		{
	      path: 'country-location',
	      indexRoute: { component: countryLocation }
		},
		{
	      path: '*',
	      indexRoute: { component: countryList }
		}
	]
};

export default routes;
