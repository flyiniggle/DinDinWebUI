import DinDinService from './DinDinService';

describe('#Business #Services #DinDinService', function() {
    beforeEach(() => { fetch.mockResponse(JSON.stringify({token: '1234'})); });
    afterEach(fetch.resetMocks);

    describe('#send', function() {
        it('should send a request to the server with root html and specified path.', async function() {
            expect.assertions(1);
            await DinDinService.send('/test/');

            const url = fetch.mock.calls[0][0];

            expect(url).toEqual(`${__APIRoot__}/test/`);
        });

        it('should send a request to the server with default headers.', async function() {
            expect.assertions(2);
            await DinDinService.send('/test/');

            const { credentials, headers } = fetch.mock.calls[0][1];

            expect(credentials).toEqual('include');
            expect(headers).toEqual({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            });
        });

        it('should merge options with the default options.', async function() {
            const options = {
                method: 'POST',
                body: {data: 'yay!'}
            };

            expect.assertions(4);
            await DinDinService.send('/test/', options);

            const { method, body, headers, credentials } = fetch.mock.calls[0][1];

            expect(method).toEqual('POST');
            expect(body).toEqual({data: 'yay!'});
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
                body: {data: 'yay!'}
            };

            expect.assertions(4);
            await DinDinService.send('/test/', options);

            const { method, body, headers, credentials } = fetch.mock.calls[0][1];

            expect(method).toEqual('POST');
            expect(body).toEqual({data: 'yay!'});
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
            await DinDinService.send('/test/', options);
            const { headers } = fetch.mock.calls[0][1];

            expect(headers).toMatchObject({
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Connection: 'keep-alive',
                'Accept-Encoding': 'gzip, deflate'
            });
        });
    });
});