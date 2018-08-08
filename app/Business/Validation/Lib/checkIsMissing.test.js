import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import checkIsMissing from './checkIsMissing';

describe('#Business #Validation #Lib #checkIsMissing', function() {
    it('should return an error if no value is given', function() {
        expect(checkIsMissing()).toEqual(ErrorLevel.error);
    });

    it('should return a specified error level', function() {
        expect(checkIsMissing(null, ErrorLevel.info)).toEqual(ErrorLevel.info);
    });

    it('should return an error if an empty string is given', function() {
        expect(checkIsMissing('')).toEqual(ErrorLevel.error);
    });

    it('should return an error if null is given', function() {
        expect(checkIsMissing(null)).toEqual(ErrorLevel.error);
    });

    it('should return ok if a string is given', function() {
        expect(checkIsMissing('hooray!')).toEqual(ErrorLevel.ok);
    });

    it('should return ok if 0 is given', function() {
        expect(checkIsMissing(0)).toEqual(ErrorLevel.ok);
    });

    it('should return ok if a boolean is given', function() {
        expect(checkIsMissing(true)).toEqual(ErrorLevel.ok);
        expect(checkIsMissing(false)).toEqual(ErrorLevel.ok);
    });

    it('should return ok if an empty array or object is given', function() {
        expect(checkIsMissing([])).toEqual(ErrorLevel.ok);
        expect(checkIsMissing({})).toEqual(ErrorLevel.ok);
    });
});