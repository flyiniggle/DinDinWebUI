import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import getErrorClassForInput from './getErrorClassForInput';

describe('#UI #Forms #Validation #getErrorClassForInput', function() {
    it('should return the error class.', function() {
        expect(getErrorClassForInput(ErrorLevel.error)).toEqual('error-input');
    });

    it('should return the warning class.', function() {
        expect(getErrorClassForInput(ErrorLevel.warning)).toEqual('warning-input');
    });

    it('should return the info class.', function() {
        expect(getErrorClassForInput(ErrorLevel.info)).toEqual('info-input');
    });

    it('should return an empty string if it is ok.', function() {
        expect(getErrorClassForInput(ErrorLevel.ok)).toEqual('');
    });

    it('should return an empty string by default.', function() {
        expect(getErrorClassForInput()).toEqual('');
    });
});