import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import getErrorClassForAlert from './getErrorClassForAlert';

describe('#UI #Forms #Validation #getErrorClassForAlert', function() {
    it('should return the error class.', function() {
        expect(getErrorClassForAlert(ErrorLevel.error)).toEqual('alert-danger');
    });

    it('should return the warning class.', function() {
        expect(getErrorClassForAlert(ErrorLevel.warning)).toEqual('alert-warning');
    });

    it('should return the info class.', function() {
        expect(getErrorClassForAlert(ErrorLevel.info)).toEqual('alert-info');
    });

    it('should return an empty string if it is ok.', function() {
        expect(getErrorClassForAlert(ErrorLevel.ok)).toEqual('');
    });

    it('should return an empty string by default.', function() {
        expect(getErrorClassForAlert()).toEqual('');
    });
});