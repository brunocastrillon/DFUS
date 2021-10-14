import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { history } from '../history';

import {
    BrowserRouter,
    Router,
    Route,
    Switch
} from 'react-router-dom';

import store from '../data/store';
import CssBaseline from '@material-ui/core/CssBaseline';

import baseLogin from '../containers/login';
import login from '../pages/login';
import baseDashboard from '../containers/dashboard';
import dashboard from '../pages/dashboard';

export default function Routes() {
    return (
        <Fragment>
            <Provider store={store}>
                <Router history={history}>
                    <BrowserRouter>{/* <BrowserRouter basename="/alexandria/"> */}
                        <CssBaseline />
                        <Switch>
                            <Route path="/" exact component={baseLogin(login)} />
                            <Route path="/dashboard" exact component={baseDashboard(dashboard)} />
                        </Switch>
                    </BrowserRouter>
                </Router>
            </Provider>
        </Fragment>
    )
}