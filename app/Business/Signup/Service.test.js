import SignupService from './Service';

describe('#Business #Signup #Service', function() {
    beforeEach(() => fetch.mockResponse(JSON.stringify({token: '1234'})));
    afterEach(fetch.resetMocks);


    describe('#post', function() {
        it('should send a username, password, and email to a server.', async function() {
            const u = 'username test';
            const p = 'passwordTest';
            const e = 'email@email.com';

            expect.assertions(3);
            await SignupService.create(u, p, e);

            const { username, password, email } = JSON.parse(fetch.mock.calls[0][1].body);

            expect(username).toEqual(u);
            expect(password).toEqual(p);
            expect(email).toEqual(e);
        });
    });
});