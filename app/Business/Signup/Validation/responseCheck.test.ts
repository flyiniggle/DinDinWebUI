import responseCheck, { ErrorResponseProps } from "Business/Signup/Validation/responseCheck";
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

describe('#Business #Signup #Validation #responseCheck', function () {
    it('should return an empty array if there are no errors.', function () {
        expect(responseCheck({})).toEqual([]);
    })

    it('should return the first error message for usernames.', function () {
        const errors: ErrorResponseProps = {
            username: ['this is a total error', 'this is another error']
        };
        const result = responseCheck(errors);
        const firstResult = result[0];

        expect(result).toHaveLength(1);
        expect(firstResult.type).toEqual(ErrorLevel.error);
        expect(firstResult.message).toEqual('this is a total error');
        expect(firstResult.field).toEqual('username');
    })

    it('should return a custom error message for an in-use username.', function () {
        const errors: ErrorResponseProps = {
            username: ['This field must be unique.']
        };
        const result = responseCheck(errors);

        expect(result[0].message).toEqual('Oops, that username is already in use. Pick another!');
    })

    it('should return an error message for email.', function () {
        const errors: ErrorResponseProps = {
            email: ['lalala BORKENED!.', 'how dare you be so borkedned?']
        };
        const result = responseCheck(errors);
        const firstResult = result[0];

        expect(result).toHaveLength(1);
        expect(firstResult.type).toEqual(ErrorLevel.error);
        expect(firstResult.message).toEqual('lalala BORKENED!.');
        expect(firstResult.field).toEqual('email');
    })

    it('should return an error message for password.', function () {
        const errors: ErrorResponseProps = {
            password: ['lalala BORKENED!.', 'moar errors!']
        };
        const result = responseCheck(errors);
        const firstResult = result[0];

        expect(result).toHaveLength(1);
        expect(firstResult.type).toEqual(ErrorLevel.error);
        expect(firstResult.message).toEqual('lalala BORKENED!.');
        expect(firstResult.field).toEqual('password');
    })
})