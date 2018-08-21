import authenticate from 'Business/Auth/authenticate';
import authStatus from 'Business/Auth/authStatus';
import { fake, replace, restore } from 'sinon';
import { Result } from 'true-myth';
import AuthService from 'Business/Auth/Service';


describe('#Business #Auth #authenticate', function() {
    it('should reject if no username is provided.', function() {
        expect(authenticate()).rejects.toMatchSnapshot();
    });

    it('should reject if no password is provided.', function() {
        expect(authenticate('test')).rejects.toMatchSnapshot();
    });

    it('should return an error result if it receives a failed credentials validation message from the server', async function() {
        const serviceFake = fake.resolves(Result.err({non_field_errors: ['Unable to log in with provided credentials.']}));

        replace(AuthService, 'get', serviceFake);
        expect.assertions(1);

        const result = await authenticate('user', 'password');

        expect(result.unsafelyUnwrapErr()).toMatchSnapshot();
        restore();
    });

    it('should return an error result if it receives an unknown validation message from the server', async function() {
        const serviceFake = fake.resolves(Result.err({someError: ['this is an error.']}));

        replace(AuthService, 'get', serviceFake);
        expect.assertions(1);

        const result = await authenticate('user', 'password');

        expect(result.unsafelyUnwrapErr()).toMatchSnapshot();
        restore();
    });

    it('should return a generic error result if it receives no token.', async function() {
        const serviceFake = fake.resolves(Result.err({}));

        replace(AuthService, 'get', serviceFake);
        expect.assertions(1);

        const result = await authenticate('user', 'password');

        expect(result.unsafelyUnwrapErr()).toMatchSnapshot();
        restore();
    });

    it('should resolve to the token and username if successful', function() {
        const serviceFake = fake.resolves({token: 123456});

        replace(AuthService, 'get', serviceFake);

        expect(authenticate('user', 'password')).resolves.toEqual({token: 123456, username: 'user'});
        restore();
    });

    it('should set authStatus.loggedIn to true if successful.', async function() {
        const serviceFake = fake.resolves(Result.ok({token: 123456}));

        replace(AuthService, 'get', serviceFake);

        expect.assertions(1);

        await authenticate('user', 'password');
        expect(authStatus.loggedIn).toEqual(true);
        restore();
    });
});