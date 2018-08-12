import fieldIsEmpty from './fieldIsEmpty';

describe('#Business #Validation #Lib #fieldIsEmpty', function() {
    it('should return true if no value is given', function() {
        expect(fieldIsEmpty()).toEqual(true);
    });

    it('should return true if an empty string is given', function() {
        expect(fieldIsEmpty('')).toEqual(true);
    });

    it('should return true if null is given', function() {
        expect(fieldIsEmpty(null)).toEqual(true);
    });

    it('should return false if a string is given', function() {
        expect(fieldIsEmpty('hooray!')).toEqual(false);
    });

    it('should return false if 0 is given', function() {
        expect(fieldIsEmpty(0)).toEqual(false);
    });

    it('should return false if a boolean is given', function() {
        expect(fieldIsEmpty(true)).toEqual(false);
        expect(fieldIsEmpty(false)).toEqual(false);
    });

    it('should return false if an empty array or object is given', function() {
        expect(fieldIsEmpty([])).toEqual(false);
        expect(fieldIsEmpty({})).toEqual(false);
    });
});