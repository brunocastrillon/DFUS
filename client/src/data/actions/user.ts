import axios from 'axios';
import handleError from '../error';

const api = process.env.REACT_APP_BACKEND_URL;//process.env.API;

export const toAuth = (publicAddress: any, callback: (arg0: { publicAddress?: any; handleErrorMessage?: any; }) => void) => {
    return function () {
        axios.post(api + '/users', { publicAddress })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => callback(handleError(error)));
    }
}