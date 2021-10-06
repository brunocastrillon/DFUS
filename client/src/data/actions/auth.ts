import axios from 'axios';

import {
    LOGIN,
    LOGOUT
} from '../types';

import {
    saveToken,
    clearToken,
    getToken,
    getHeaders
} from '../storage';

import handleError from '../error';

const api = process.env.REACT_APP_BACKEND_URL;

export const logIn = (publicAddress: any, callback: (arg0: any) => any) => {
    return function (dispatch: (arg0: { type: string; payload: { publicAddress: any; }; }) => void) {
        axios.post(api + '/auth', { publicAddress })
            .then((response) => {
                console.log(response);
                // saveToken(response.data);
                // dispatch({ type: LOGIN, payload: response.data });
            })
            .catch((error) => callback(handleError(error)));
    }
}

export const logOut = () => {
    clearToken();
    return { type: LOGOUT }
}

export const getLoggedInUser = () => {
    return function (dispatch: any) {
        if (getToken()) {
            dispatch({ type: LOGIN });
        }
        else {
            dispatch({ type: LOGOUT });
            clearToken();
        }
    }
}

export { toAuth } from './user';