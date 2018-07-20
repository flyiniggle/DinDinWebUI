import isError from 'Business/Validation/isError';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';


describe('#Business #Validation #isError', function() {
    it('should return true if value is a variant of Validation.Types.ErrorLevel.', function() {
        const errorResult = isError(ErrorLevel.error);
        const warningResult = isError(ErrorLevel.warning);
        const infoResult = isError(ErrorLevel.info);
        const okResult = isError(ErrorLevel.ok);

        expect(errorResult).toBe(true);
        expect(warningResult).toBe(true);
        expect(infoResult).toBe(true);
        expect(okResult).toBe(true);
    });

    it('should return false if value is not a variant of Validation.Types.ErrorLevel', function() {
        expect(isError()).toBe(false);
        expect(isError('')).toBe(false);
        expect(isError(0)).toBe(false);
        expect(isError(1)).toBe(false);
        expect(isError([])).toBe(false);
        expect(isError({})).toBe(false);
        expect(isError(true)).toBe(false);
        expect(isError(false)).toBe(false);
    });
});