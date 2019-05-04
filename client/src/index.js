import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {BaseLayout} from './components/BaseLayout';
import {RecordPosition} from './components/RecordPosition';
import {AllLocations} from './components/AllLocations';
// import { createStore } from 'redux';
// import { Provider } from react-redux




ReactDOM.render(
    <BrowserRouter>
    <BaseLayout>
    <Switch>
        <Route path='/' exact component={App} />
        <Route path='/record-position' exact component={RecordPosition} />
        <Route path='/all-locations' exact component={AllLocations} />
    </Switch>
    </BaseLayout>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
