import authenticate from 'Business/Auth/authenticate';
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

    it('should reject if it recieves an uknown validation message from the server', function() {
        const serviceFake = fake.resolves({someError: ['this is an error.']});

        replace(AuthService, 'get', serviceFake);

        expect(authenticate('user', 'password')).rejects.toMatchSnapshot();
        restore();
    });

    it('should reject if it recieves no token', function() {
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
});