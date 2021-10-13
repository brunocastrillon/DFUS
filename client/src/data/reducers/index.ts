import { combineReducers } from 'redux';

import authReducer from './auth';
import dashboardReducer from './dashboard';
import userReducer from './user';
import fileReducer from './file';

const reducers = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    file: fileReducer,
});

export default reducers;