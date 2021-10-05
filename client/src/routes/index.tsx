import React,
{
    Suspense,
    Fragment
} from 'react';

import {
    BrowserRouter,
    Router,
    Route,
    Switch,
    useLocation
} from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '../data/store.js';

import { history } from '../history';

import CssBaseline from '@material-ui/core/CssBaseline';

import baseLogin from '../components/login';
import login from '../pages/login';

import baseDashboad from '../containers/dashboard';
import dashboard from '../pages/dashboard';

export default function Routes() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter basename="/alexandria/">
                    <CssBaseline />
                    <Switch>
                        <Route path="/" exact component={baseLogin(login)} />
                        <Route path="/dashboard" exact component={baseDashboad(dashboard)} />
                    </Switch>
                </BrowserRouter>
            </Router>
        </Provider>
    )
}