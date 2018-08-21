import { mergeDeepRight } from 'ramda';
import { Result } from 'true-myth';

const DinDinAPI = __APIRoot__;

function DinDinService() {
    this.send = async function(url: string, options: object = {}): Promise<Result<any, any>> {
        const defaultOptions = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            }
        };
        const requestOptions = mergeDeepRight(defaultOptions, options);

        const response = await fetch(`${DinDinAPI}${url}`, requestOptions);
        const responseJSON = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                if(this.handlerNotLoggedIn) {
                    this.handlerNotLoggedIn();
                }
            } else if (this.handleNotOkResponse) {
                this.handleNotOkResponse();
            }
            return Result.err(responseJSON);
        }

        return Result.ok(responseJSON);
    };

    this.addNotLoggedInHandler = function(handler) {
        this.handlerNotLoggedIn = handler;
    }.bind(this);

    this.addNotOkResponseHandler = function(handler) {
        this.handleNotOkResponse = handler;
    }.bind(this);
}

export default new DinDinService();