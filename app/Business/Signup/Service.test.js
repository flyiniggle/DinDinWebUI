import SignupService from './Service';

describe('#Business #Signup #Service', function() {
    beforeEach(() => fetch.mockResponse(JSON.stringify({token: '1234'})));
    afterEach(fetch.resetMocks);


    describe('#post', function() {
        it('should send a username, password, and email to a server.', async function() {
            const data = {
                username: 'username test',
                password: 'passwordTest',
                email: 'email@email.com'
            };

            expect.assertions(1);
            await SignupService.post(data);

            const postParams = JSON.parse(fetch.mock.calls[0][1].body);

            expect(postParams).toEqual(data);
        });
    });
});