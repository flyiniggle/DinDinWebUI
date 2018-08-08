import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import checkPasswordRepeat from './checkPasswordRepeat';

describe('#Business #Signup #Validation #CheckPasswordRepeat', function() {
    it('should return an error if no value is given', function() {
        expect(checkPasswordRepeat()).toEqual(ErrorLevel.error);
    });

    it('should return an error if an empty string is given', function() {
        expect(checkPasswordRepeat('')).toEqual(ErrorLevel.error);
    });

    it('should return ok if a string is given', function() {
        expect(checkPasswordRepeat('hooray!')).toEqual(ErrorLevel.ok);
    });
});