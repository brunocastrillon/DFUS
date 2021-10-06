import { combineReducers } from 'redux';

import authReducer from './auth';
import dashboardReducer from './dashboard';
import userReducer from './user';

const reducers = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    user: userReducer,
});

export default reducers;