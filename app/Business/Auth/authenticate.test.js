import authenticate from 'Business/Auth/authenticate';
import authStatus, { USERNAME_KEY } from 'Business/Auth/authStatus';
import { fake, replace, restore } from 'sinon';
import { Result } from 'true-myth';
import AuthService from 'Business/Auth/Service';


describe('#Business #Auth #authenticate', function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';

    afterEach(restore);
    it('should reject if no username is provided.', function() {
        expect(authenticate()).resolves.toMatchSnapshot();
    });

    it('should reject if no password is provided.', function() {
        expect(authenticate('test')).resolves.toMatchSnapshot();
    });

    it('should return an error result if it receives a failed credentials validation message from the server', async function() {
        const serviceFake = fake.resolves(Result.err({ non_field_errors: ['Unable to log in with provided credentials.'] }));

        replace(AuthService, 'post', serviceFake);
        expect.assertions(1);

        const result = await authenticate('user', 'password');

        expect(result.unsafelyUnwrapErr()).toMatchSnapshot();

    });

    it('should return an error result if it receives an unknown validation message from the server', async function() {
        const serviceFake = fake.resolves(Result.err({ someError: ['this is an error.'] }));

        replace(AuthService, 'post', serviceFake);
        expect.assertions(1);

        const result = await authenticate('user', 'password');

        expect(result.unsafelyUnwrapErr()).toMatchSnapshot();

    });

    it('should return a generic error result if it receives no token.', async function() {
        const serviceFake = fake.resolves(Result.err({}));

        replace(AuthService, 'post', serviceFake);
        expect.assertions(1);

        const result = await authenticate('user', 'password');

        expect(result.unsafelyUnwrapErr()).toMatchSnapshot();

    });

    it('should resolve to the token and username if successful', async function() {
        const serviceFake = fake.resolves(Result.ok({ token }));

        replace(AuthService, 'post', serviceFake);

        expect.assertions(2);
        const result = await authenticate('user', 'password');
        expect(result.isOk()).toBe(true);
        expect(result.unwrapOr({})).toEqual({ token, username: 'user' });

    });

    it('should set authStatus.loggedIn to true if successful.', async function() {
        const serviceFake = fake.resolves(Result.ok({ token }));

        replace(AuthService, 'post', serviceFake);

        expect.assertions(1);

        await authenticate('user', 'password');
        expect(authStatus.authToken).toEqual(token);

    });

    it('should set authStatus.username to the username if successful.', async function() {
        const serviceFake = fake.resolves(Result.ok({ token }));

        replace(AuthService, 'post', serviceFake);

        expect.assertions(1);

        await authenticate('user', 'password');
        expect(authStatus.username).toEqual('user');

        localStorage.removeItem(USERNAME_KEY);
    });
});