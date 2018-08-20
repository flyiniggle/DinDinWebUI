import AuthService from './Service';

describe('#Business #Auth #Service', function() {
    beforeEach(() => fetch.mockResponse(JSON.stringify({token: '1234'})));
    afterEach(fetch.resetMocks);


    describe('#get', function() {
        it('should send a username and password to a server.', async function() {
            const u = 'username test';
            const p = 'passwordTest';

            expect.assertions(2);
            await AuthService.get({username: u, password: p});

            const { username, password } = JSON.parse(fetch.mock.calls[0][1].body);

            expect(username).toEqual(u);
            expect(password).toEqual(p);
        });
    });
});