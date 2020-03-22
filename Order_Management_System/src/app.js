import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppRouter from './routers/AppRouter';
import RoomStore from './reducers/reducers.js';

const store = createStore(RoomStore);

ReactDOM.render(
	<Provider store={store}>
		<AppRouter/>
	</Provider>,
	document.getElementById('app')
);