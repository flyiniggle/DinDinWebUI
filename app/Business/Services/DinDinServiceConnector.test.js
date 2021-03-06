import authStatus from 'Business/Auth/authStatus';
import { spy } from 'sinon';

import DinDinServiceConnector from './DinDinServiceConnector';

describe('#Business #Services #DinDinServiceConnector', function() {
    beforeEach(() => { fetch.mockResponse(JSON.stringify({ token: '1234' })); });
    afterEach(fetch.resetMocks);

    describe('#send', function() {
        it('should send a request to the server with root html and specified path.', async function() {
            expect.assertions(1);
            await DinDinServiceConnector.send('/test/');

            const url = fetch.mock.calls[0][0];

            expect(url).toEqual(`${__APIRoot__}/test/`);
        });

        it('should send a request to the server with default headers.', async function() {
            expect.assertions(2);
            await DinDinServiceConnector.send('/test/');

            const { credentials, headers } = fetch.mock.calls[0][1];

            expect(credentials).toEqual('include');
            expect(headers).toEqual({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            });
        });

        it('should include auth headers if an auth token is set.', async function() {
            authStatus.authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';

            expect.assertions(1);
            await DinDinServiceConnector.send('/test/');

            const { headers } = fetch.mock.calls[0][1];

            expect(headers).toEqual({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `JWT ${authStatus.authToken}`
            });

            authStatus.logOut();
        });

        it('should merge options with the default options.', async function() {
            const options = {
                method: 'POST',
                body: { data: 'yay!' }
            };

            expect.assertions(4);
            await DinDinServiceConnector.send('/test/', options);

            const { method, body, headers, credentials } = fetch.mock.calls[0][1];

            expect(method).toEqual('POST');
            expect(body).toEqual({ data: 'yay!' });
            expect(credentials).toEqual('include');
            expect(headers).toEqual({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            });
        });

        it('should overwrite the default options.', async function() {
            const options = {
                method: 'POST',
                credentials: 'same-origin',
                body: { data: 'yay!' }
            };

            expect.assertions(4);
            await DinDinServiceConnector.send('/test/', options);

            const { method, body, headers, credentials } = fetch.mock.calls[0][1];

            expect(method).toEqual('POST');
            expect(body).toEqual({ data: 'yay!' });
            expect(credentials).toEqual('same-origin');
            expect(headers).toEqual({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            });
        });

        it('should merge headers.', async function() {
            const options = {
                headers: {
                    Connection: 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate'
                }
            };

            expect.assertions(1);
            await DinDinServiceConnector.send('/test/', options);
            const { headers } = fetch.mock.calls[0][1];

            expect(headers).toMatchObject({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Connection: 'keep-alive',
                'Accept-Encoding': 'gzip, deflate'
            });
        });

        it('should return an ok result containing the data if the fetch succeeds.', async function() {
            expect.assertions(2);
            const result = await DinDinServiceConnector.send('/test/');

            expect(result.isOk()).toBe(true);
            expect(result.unwrapOr({})).toEqual({ token: '1234' });
        });

        it('should return an error result if fetch fails.', async function() {
            fetch.resetMocks();
            fetch.mockReject('this is bad');
            expect.assertions(2);

            const result = await DinDinServiceConnector.send('/test/');

            expect(result.isErr()).toBe(true);
            expect(result.unsafelyUnwrapErr()).toEqual('this is bad');
        });

        it('should return an error result if fetch returns a non-200 status.', async function() {
            const handler = spy();

            expect.assertions(1);
            fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
            DinDinServiceConnector.addNotLoggedInHandler(handler);
            const result = await DinDinServiceConnector.send('/test/');

            expect(result.isErr()).toBe(true);
        });
    });

    describe('#addNotLoggedInHandler', function() {
        it('should call a registered logged out handler if the response status is 401.', async function() {
            const handler = spy();

            expect.assertions(1);
            fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
            DinDinServiceConnector.addNotLoggedInHandler(handler);
            await DinDinServiceConnector.send('/test/');

            expect(handler.calledOnce).toBe(true);
        });

        it('should not call a registered logged out handler if the response status is not 401.', async function() {
            const handler = spy();

            expect.assertions(1);
            DinDinServiceConnector.addNotLoggedInHandler(handler);
            fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
            await DinDinServiceConnector.send('/test/');

            fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
            await DinDinServiceConnector.send('/test/');

            expect(handler.callCount).toBe(0);
        });
    });

    describe('#addNotOkResponseHandler', function() {
        it('should call an error handler if the response status is not ok.', async function() {
            const handler = spy();

            expect.assertions(1);
            fetch.mockResponseOnce(JSON.stringify({}), { status: 400 });
            DinDinServiceConnector.addNotOkResponseHandler(handler);
            await DinDinServiceConnector.send('/test/');

            expect(handler.calledOnce).toBe(true);
        });

        it('should not call an error handler if the response status is ok.', async function() {
            const handler = spy();

            expect.assertions(1);
            DinDinServiceConnector.addNotOkResponseHandler(handler);
            fetch.mockResponseOnce(JSON.stringify({}));
            await DinDinServiceConnector.send('/test/');

            expect(handler.callCount).toBe(0);
        });
    });
});