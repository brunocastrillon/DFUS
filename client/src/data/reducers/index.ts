import { combineReducers } from 'redux';

import authReducer from './auth';
import dashboardReducer from './dashboard';

const reducers = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
});

export default reducers;