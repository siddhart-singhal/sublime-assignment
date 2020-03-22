import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header.jsx';
import OrderDashboard from '../containers/OrderDashboard.jsx';
import CreateOrder from '../containers/CreateOrder.jsx';

const AppRouter = () => (
    <BrowserRouter>
		<React.Fragment>
			<Header/>
			<Switch>
				<Route path='/' component={OrderDashboard} exact={true}/>
				<Route path='/createOrder' component={CreateOrder} exact={true}/>
			</Switch>
		</React.Fragment>
	</BrowserRouter>
);
