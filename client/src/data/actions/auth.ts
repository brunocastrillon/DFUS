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

export const login = () => {

}

export const logout = () => {
    clearToken();
    return { type: LOGOUT }
}