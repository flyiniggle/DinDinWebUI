import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import getErrorClassForText from './getErrorClassForText';


describe('#UI #Forms #Validation #getErrorClassForText', function() {
    it('should return the error class.', function() {
        expect(getErrorClassForText(ErrorLevel.error)).toEqual('error-text');
    });

    it('should return the warning class.', function() {
        expect(getErrorClassForText(ErrorLevel.warning)).toEqual('warning-text');
    });

    it('should return the info class.', function() {
        expect(getErrorClassForText(ErrorLevel.info)).toEqual('info-text');
    });

    it('should return an empty string.', function() {
        expect(getErrorClassForText(ErrorLevel.ok)).toEqual('');
    });
});