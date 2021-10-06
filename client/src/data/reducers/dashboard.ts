/* eslint-disable import/no-anonymous-default-export */
import { GET_DASHBOARD } from "../types";

export default (state = {}, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case GET_DASHBOARD:
            return {
                ...state,
                dashboardDetails: action.payload
            }
        default:
            return state;
    }
}