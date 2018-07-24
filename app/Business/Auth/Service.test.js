import { stub } from 'sinon';

import AuthService from './Service';

describe('#Business #Auth #Service', function() {
    window.fetch = stub().resolves({json: () => ({token: '1234'})});

    describe('#get', function() {
        it('should send a username and password to a server.', function() {
            const u = 'username test';
            const p = 'passwordTest';

            expect.assertions(2);
            AuthService.get(u, p).then(function() {
                const { username, password } = JSON.parse(window.fetch.firstCall.args[1].body);

                expect(username).toEqual(u);
                expect(password).toEqual(p);
            });
        });
    });
});