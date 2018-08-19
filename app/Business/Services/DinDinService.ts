import { createDinDinResponse } from 'Business/Services/types/DinDinResponse';
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
                if (!response.ok) {
                    if (response.status === 401) {
                        if(this.handlerNotLoggedIn) {
                            this.handlerNotLoggedIn();
                        }
                    } else if (this.handleNotOkResponse) {
                        this.handleNotOkResponse();
                    }
                    Promise.reject(createDinDinResponse(response.status, response.json()));
                }

                return createDinDinResponse(response.status, response.json());
            }.bind(this));
    };

    this.addNotLoggedInHandler = function(handler) {
        this.handlerNotLoggedIn = handler;
    }.bind(this);

    this.addNotOkResponseHandler = function(handler) {
        this.handleNotOkResponse = handler;
    }.bind(this);
}

export default new DinDinService();