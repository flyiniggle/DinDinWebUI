import { mergeDeepRight } from 'ramda';

const DinDinAPI = __APIRoot__;

const DinDinService = {
    send(url, options = {}) {
        const defaultOptions = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            }
        };
        const requestOptions = mergeDeepRight(defaultOptions, options);

        return fetch(`${DinDinAPI}${url}`, requestOptions);
    }
};

export default DinDinService;