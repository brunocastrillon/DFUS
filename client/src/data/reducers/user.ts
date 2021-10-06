/* eslint-disable import/no-anonymous-default-export */
import { USER } from '../types';

export default (state = {}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case USER:
            return {
                ...state,
                userDatails: action.payload
            }
        default:
            return state;
    }
}