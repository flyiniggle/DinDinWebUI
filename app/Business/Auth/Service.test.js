import fetchMock from 'fetch-mock';

import AuthService from './Service';

describe('#Business #Auth #Service', function() {
    beforeAll(function() {
        fetchMock.mock('test/api-token-auth/', {
            body: {token: '1234'}
        });
    });

    afterEach(fetchMock.reset);

    describe('#get', function() {
        it('should send a username and password to a server.', function() {
            const u = 'username test';
            const p = 'passwordTest';

            expect.assertions(3);
            AuthService.get(u, p).then(function() {
                const { username, password } = JSON.parse(fetchMock.lastCall()[1].body);

                expect(fetchMock.called('test/api-token-auth/')).toBe(true);
                expect(username).toEqual(u);
                expect(password).toEqual(p);
            });
        });
    });
});