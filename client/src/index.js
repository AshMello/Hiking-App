import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {BaseLayout} from './components/BaseLayout';
import {RecordPosition} from './components/RecordPosition';
import {AllLocations} from './components/AllLocations';
import Login from './components/Login';
import Register from './components/Register';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer'

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <BaseLayout>
    <Switch>
        <Route path='/' exact component={App} />
        <Route path='/record-position' exact component={RecordPosition} />
        <Route path='/all-locations' exact component={AllLocations} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />

    </Switch>
    </BaseLayout>
    </BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
