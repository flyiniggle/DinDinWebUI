import ErrorType from 'Business/Validation/Types/ErrorLevel';
import getMessagesForField from 'Business/Validation/getMessagesForField';

import preflightCheck, {checkPassword, checkUsername } from './preflightCheck';

describe('#Business #Auth #Validation #preflightCheck', function() {
    describe('#preflightCheck', function() {
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

    describe('checkPassword', function() {
        it('should return OK if the password isn\'t empty.', function() {
            const p = 'test';

            expect(checkPassword(p)).toEqual(ErrorType.ok);
        });
        it('should return an error if the password is empty', function() {
            const p = '';

            expect(checkPassword(p)).toEqual(ErrorType.error);
        });
        it('should return an error if undefined', function() {

            expect(checkPassword()).toEqual(ErrorType.error);
        });
    });

    describe('checkUserName', function() {
        it('should return OK if the username isn\'t empty.', function() {
            const u = 'test';

            expect(checkUsername(u)).toEqual(ErrorType.ok);
        });
        it('should return an error if the password is empty', function() {
            const u = '';

            expect(checkUsername(u)).toEqual(ErrorType.error);
        });
        it('should return an error if undefined', function() {

            expect(checkUsername()).toEqual(ErrorType.error);
        });
    });
});