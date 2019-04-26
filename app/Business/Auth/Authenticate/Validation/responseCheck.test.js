import responseCheck from 'Business/Auth/Authenticate/Validation/responseCheck';
import ErrorType from 'Business/Validation/Types/ErrorLevel';


describe('#Business #Auth #Authetnicate #Validation #responseCheck', function() {
    it('should return no message if a token is present.', function() {
        const input = { token: 12345 };

        expect(responseCheck(input)).toEqual([]);
    });

    it('should return a message if the login credentials were wrong.', function() {
        const input = { non_field_errors: ['Unable to log in with provided credentials.'] };
        const result = responseCheck(input);

        expect(result.length).toEqual(1);
        expect(result[0]).toHaveProperty('type', ErrorType.error);
        expect(result[0]).toHaveProperty('message', 'Username and password did not match.');
    });

    it('should return a message if the login request failed.', function() {
        const input = { unknown: ['Some unexpected message.'] };
        const result = responseCheck(input);

        expect(result.length).toEqual(1);
        expect(result[0]).toHaveProperty('type', ErrorType.error);
        expect(result[0]).toHaveProperty('message', 'It is not possible to log in right now.');
    });
});