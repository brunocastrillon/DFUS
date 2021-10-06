/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN,
    LOGOUT
} from '../types';

export default (state = {}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedInUser: action.payload,
                logged: true
            }
        case LOGOUT:
            return {
                ...state,
                loggedInUser: null,
                logged: false
            }
        default:
            return state;
    }
}