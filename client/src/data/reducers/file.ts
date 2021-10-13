/* eslint-disable import/no-anonymous-default-export */
import { FILE } from '../types';

export default (state = {}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case FILE:
            return {
                ...state,
                fileHash: action.payload
            }
        default:
            return state;
    }
}