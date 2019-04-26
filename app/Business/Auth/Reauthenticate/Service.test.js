import ReauthenticateService from './Service';

describe('#Business #Auth #Reauthenticate #Service', function() {
    const newToken = 'new token';

    beforeEach(() => fetch.mockResponse(JSON.stringify({ token: newToken })));
    afterEach(fetch.resetMocks);

    describe('#get', function() {
        it('should refresh the auth token.', async function() {
            const oldToken = 'old token';

            expect.assertions(2);
            const result = await ReauthenticateService.post(oldToken);

            const { token } = JSON.parse(fetch.mock.calls[0][1].body);

            expect(token).toEqual(oldToken);
            expect(result.unsafelyUnwrap()).toHaveProperty('token', newToken);
        });
    });
});