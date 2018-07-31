import { reset, stub } from 'sinon';

import DinDinService from './DinDinService';

describe('#Business #Services #DinDinService', function() {
    beforeEach(function() {
        window.fetch = stub().resolves({json: () => ({token: '1234'})});
    });

    afterEach(reset);

    describe('#send', function() {
        it('should send a request to the server with root html and specified path.', function() {
            expect.assertions(1);
            DinDinService.send('/test/').then(function() {
                const url = window.fetch.firstCall.args[1];

                expect(url).toEqual(`${__APIRoot__}/test/`);
            });
        });

        it('should send a request to the server with default headers.', function() {
            expect.assertions(2);
            DinDinService.send('/test/').then(function() {
                const { credentials, headers } = window.fetch.firstCall.args[1];

                expect(credentials).toEqual('include');
                expect(headers).toEqual({
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json'
                });
            });
        });

        it('should merge options with the default options.', function() {
            const options = {
                method: 'POST',
                body: {data: 'yay!'}
            };

            expect.assertions(4);
            DinDinService.send('/test/', options).then(function() {
                const { method, body, headers, credentials } = window.fetch.firstCall.args[1];

                expect(method).toEqual('POST');
                expect(body).toEqual({data: 'yay!'});
                expect(credentials).toEqual('include');
                expect(headers).toEqual({
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json'
                });
            });
        });

        it('should overwrite the default options.', function() {
            const options = {
                method: 'POST',
                credentials: 'same-origin',
                body: {data: 'yay!'}
            };

            expect.assertions(4);
            DinDinService.send('/test/', options).then(function() {
                const { method, body, headers, credentials } = window.fetch.firstCall.args[1];

                expect(method).toEqual('POST');
                expect(body).toEqual({data: 'yay!'});
                expect(credentials).toEqual('same-origin');
                expect(headers).toEqual({
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json'
                });
            });
        });

        it('should merge headers.', function() {
            const options = {
                headers: {
                    Connection: 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate'
                }
            };

            expect.assertions(1);
            DinDinService.send('/test/', options).then(function() {
                const { headers } = window.fetch.firstCall.args[1];

                expect(headers).toMatchObject({
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                    Connection: 'keep-alive',
                    'Accept-Encoding': 'gzip, deflate'
                });
            });
        });
    });
});