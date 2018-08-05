import authenticate from 'Business/Auth/authenticate';
import authStatus from 'Business/Auth/authStatus';
import { fake, replace, restore } from 'sinon';
import AuthService from 'Business/Auth/Service';


describe('#Business #Auth #suthenticate', function() {
    it('should reject if no username is provided.', function() {
        expect(authenticate()).rejects.toMatchSnapshot();
    });

    it('should reject if no password is provided.', function() {
        expect(authenticate(test)).rejects.toMatchSnapshot();
    });

    it('should reject if it recieves a failed credentials validation message from the server', function() {
        const serviceFake = fake.resolves({non_field_errors: ['Unable to log in with provided credentials.']});

        replace(AuthService, 'get', serviceFake);

        expect(authenticate('user', 'password')).rejects.toMatchSnapshot();
        restore();
    });

    it('should reject if it receives an unknown validation message from the server', function() {
        const serviceFake = fake.resolves({someError: ['this is an error.']});

        replace(AuthService, 'get', serviceFake);

        expect(authenticate('user', 'password')).rejects.toMatchSnapshot();
        restore();
    });

    it('should reject if it receives no token', function() {
        const serviceFake = fake.resolves({});

        replace(AuthService, 'get', serviceFake);

        expect(authenticate('user', 'password')).rejects.toMatchSnapshot();
        restore();
    });

    it('should resolve to the token if successful', function() {
        const serviceFake = fake.resolves({token: 123456});

        replace(AuthService, 'get', serviceFake);

        expect(authenticate('user', 'password')).resolves.toEqual({token: 123456});
        restore();
    });

    it('should set authStatus.loggedIn to true if successful.', async function() {
        const serviceFake = fake.resolves({token: 123456});

        replace(AuthService, 'get', serviceFake);

        expect.assertions(1)

        await authenticate('user', 'password');
        expect(authStatus.loggedIn).toEqual(true);
        restore();
    });
});