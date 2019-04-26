import AuthValidationMessages from 'Business/Auth/Authenticate/Validation/Messages';
import SignupValidationMessages from 'Business/Signup/Validation/Messages';

import preflightCheck from './preflightCheck';

describe('#Business #Signup #Validation ##preflightCheck', function() {
    it('should return an ok result if given valid data.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };
        const result = preflightCheck(data);

        expect(result.isOk()).toBe(true);

        const resultData = result.unwrapOr('uh oh');

        expect(resultData).toEqual({
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123'
        });
    });

    it('should return an error if no user name is given.', function() {
        const data = {
            username: '',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(1);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(AuthValidationMessages.missingUserName);
    });

    it('should return an error if no email is given.', function() {
        const data = {
            username: 'new guy',
            email: '',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(1);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(SignupValidationMessages.missingEmail);
    });

    it('should return an error if an improperly formatted email address is given.', function() {
        const data = {
            username: 'new guy',
            email: 'asdfasdf',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(1);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(SignupValidationMessages.invalidEmail);
    });

    it('should return an error if password is missing.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: '',
            passwordRepeat: 'testPassword123'
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(1);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(SignupValidationMessages.passwordsDoNotMatch);
    });

    it('should return an error if re-entered password is missing.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: ''
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(1);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(SignupValidationMessages.passwordsDoNotMatch);
    });

    it('should return an error if re-entered password does not match password.', function() {
        const data = {
            username: 'new guy',
            email: 'free@last.com',
            password: 'testPassword123',
            passwordRepeat: 'asdfasdf'
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(1);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(SignupValidationMessages.passwordsDoNotMatch);
    });

    it('should return multiple errors..', function() {
        const data = {
            username: '',
            email: '',
            password: 'testPassword123',
            passwordRepeat: 'testPassword123'
        };
        const result = preflightCheck(data);

        expect(result.isErr()).toBe(true);
        expect(result.unsafelyUnwrapErr().length).toEqual(2);
        expect(result.unsafelyUnwrapErr()[0].message).toEqual(AuthValidationMessages.missingUserName);
        expect(result.unsafelyUnwrapErr()[1].message).toEqual(SignupValidationMessages.missingEmail);
    });
});