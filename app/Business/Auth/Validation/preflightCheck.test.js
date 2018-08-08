import ErrorType from 'Business/Validation/Types/ErrorLevel';
import getMessagesForField from 'Business/Validation/getMessagesForField';

import preflightCheck from './preflightCheck';

describe('#Business #Auth #Validation #preflightCheck', function() {
    it('should return an empty array', function() {
        const input = {username: 'test', password: 'test'};

        expect(preflightCheck(input)).toEqual([]);
    });

    it('should return an error if no password is provided.', function() {
        const input = {username: 'test', password: ''};
        const result = preflightCheck(input);
        const passwordError = getMessagesForField('password', result)[0];

        expect(passwordError).toHaveProperty('type', ErrorType.error);
        expect(passwordError).toHaveProperty('message', 'required');
    });

    it('should return an error if no username is provided.', function() {
        const input = {username: '', password: 'test'};
        const result = preflightCheck(input);
        const usernameError = getMessagesForField('username', result)[0];

        expect(usernameError).toHaveProperty('type', ErrorType.error);
        expect(usernameError).toHaveProperty('message', 'required');
    });

    it('should return multiple errors if neither username nor password are provided.', function() {
        const result = preflightCheck();
        const usernameError = getMessagesForField('username', result)[0];
        const passwordError = getMessagesForField('password', result)[0];

        expect(usernameError).toHaveProperty('type', ErrorType.error);
        expect(usernameError).toHaveProperty('message', 'required');
        expect(passwordError).toHaveProperty('type', ErrorType.error);
        expect(passwordError).toHaveProperty('message', 'required');
    });
});