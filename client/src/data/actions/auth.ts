import axios from 'axios';

import {
    LOGIN,
    LOGOUT
} from '../types';

import {
    saveToken,
    clearToken,
    getToken
} from '../storage';

import handleError from '../error';

const api = process.env.REACT_APP_BACKEND_URL;

export const logIn = (publicAddress: any, signature: any, callback: any) => {
    return function (dispatch: any) {
        axios.post(api + '/auth', { publicAddress, signature })
            .then((response) => {
                saveToken(response.data);
                dispatch({ type: LOGIN, payload: response.data });
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