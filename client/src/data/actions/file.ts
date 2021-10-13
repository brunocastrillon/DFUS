import axios from 'axios';
import handleError from '../error';

const api = process.env.REACT_APP_BACKEND_URL;//process.env.API;

export const toHashing = (file: any, callback: (arg0: { file?: any; handleErrorMessage?: any; }) => void) => {
    return function () {
        axios.post(api + '/files', { file })
            .then((response) => {
                callback(response.data);
            })
            .catch((error) => callback(handleError(error)));
    }
}