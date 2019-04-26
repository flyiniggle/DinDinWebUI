import ErrorType from 'Business/Validation/Types/ErrorLevel';
import getMessagesForField from 'Business/Validation/getMessagesForField';

import preflightCheck from './preflightCheck';


describe('#Business #Auth #Authenticate #Validation #preflightCheck', function () {
    it('should return an OK result with the input data', function () {
        const input = { username: 'test', password: 'test' };
        const result = preflightCheck(input);

        expect(result.isOk()).toBe(true);
        expect(result.unwrapOr('uh oh')).toEqual(input);
    });

    it('should return an error result if no password is provided.', function () {
        const input = { username: 'test', password: '' };
        const result = preflightCheck(input);

        expect(result.isErr()).toBe(true);

        const passwordError = getMessagesForField('password', result.unsafelyUnwrapErr())[0];

        expect(passwordError).toHaveProperty('type', ErrorType.error);
        expect(passwordError).toHaveProperty('message', 'required');
    });

    it('should return an error if no username is provided.', function () {
        const input = { username: '', password: 'test' };
        const result = preflightCheck(input);

        expect(result.isErr()).toBe(true);

        const usernameError = getMessagesForField('username', result.unsafelyUnwrapErr())[0];

        expect(usernameError).toHaveProperty('type', ErrorType.error);
        expect(usernameError).toHaveProperty('message', 'required');
    });

    it('should return multiple errors if neither username nor password are provided.', function () {
        const result = preflightCheck();

        expect(result.isErr()).toBe(true);

        const usernameError = getMessagesForField('username', result.unsafelyUnwrapErr())[0];
        const passwordError = getMessagesForField('password', result.unsafelyUnwrapErr())[0];

        expect(usernameError).toHaveProperty('type', ErrorType.error);
        expect(usernameError).toHaveProperty('message', 'required');
        expect(passwordError).toHaveProperty('type', ErrorType.error);
        expect(passwordError).toHaveProperty('message', 'required');
    });
});