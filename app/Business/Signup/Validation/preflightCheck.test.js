import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import SignupValidationMessages from 'Business/Signup/Validation/Messages';

import preflightCheck from './preflightCheck';

describe('#Business #Signup #Validation ##preflightCheck', function() {
    it('should return no errors if given valid data.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };

        expect(preflightCheck(data)).toEqual([]);
    });

    it('should return an error if no user name is given.', function() {
        const data = {
            username: '',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };

        expect(preflightCheck(data).length).toEqual(1);
        expect(preflightCheck(data)[0].message).toEqual(AuthValidationMessages.missingUserName);
    });

    it('should return an error if no email is given.', function() {
        const data = {
            username: 'new guy',
            email: '',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };

        expect(preflightCheck(data).length).toEqual(1);
        expect(preflightCheck(data)[0].message).toEqual(SignupValidationMessages.missingEmail);
    });

    it('should return an error if an improperly formatted email address is given.', function() {
        const data = {
            username: 'new guy',
            email: 'asdfasdf',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };

        expect(preflightCheck(data).length).toEqual(1);
        expect(preflightCheck(data)[0].message).toEqual(SignupValidationMessages.invalidEmail);
    });

    it('should return an error if password is missing.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: '',
            passwordRepeat: 'testPassword123'
        };

        expect(preflightCheck(data).length).toEqual(1);
        expect(preflightCheck(data)[0].message).toEqual(SignupValidationMessages.passwordsDoNotMatch);
    });

    it('should return an error if re-entered password is missing.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: ''
        };

        expect(preflightCheck(data).length).toEqual(1);
        expect(preflightCheck(data)[0].message).toEqual(SignupValidationMessages.passwordsDoNotMatch);
    });

    it('should return an error if re-entered password does not match password.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: 'asdfasdf'
        };

        expect(preflightCheck(data).length).toEqual(1);
        expect(preflightCheck(data)[0].message).toEqual(SignupValidationMessages.passwordsDoNotMatch);
    });

    it('should return multiple errors..', function() {
        const data = {
            username: '',
            email: '',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };

        expect(preflightCheck(data).length).toEqual(2);
        expect(preflightCheck(data)[0].message).toEqual(AuthValidationMessages.missingUserName);
        expect(preflightCheck(data)[1].message).toEqual(SignupValidationMessages.missingEmail);
    });
});