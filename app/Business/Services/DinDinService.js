import { mergeDeepRight } from 'ramda';

const DinDinAPI = __APIRoot__;

function DinDinService() {
    this.send = function(url, options = {}) {
        const defaultOptions = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            }
        };
        const requestOptions = mergeDeepRight(defaultOptions, options);

        return fetch(`${DinDinAPI}${url}`, requestOptions)
            .then(function(response) {
                if (response.status === 401) {
                    if (this.handleNotLoggedIn) {
                        this.handleNotLoggedIn();
                        Promise.reject();
                    }
                } else if (!response.ok) {
                    if (this.handleNotOkResponse) {
                        this.handleNotOkResponse();
                        Promise.reject();
                    }
                }

                return response;
            });
    };

    this.addNotLoggedInHandler = function(handler) {
        this.handleNotLoggedIn = handler;
    }.bind(this);

    this.addNotOkResponseHandler = function(handler) {
        this.handleNotOkResponse = handler;
    }.bind(this);
}

export default new DinDinService();