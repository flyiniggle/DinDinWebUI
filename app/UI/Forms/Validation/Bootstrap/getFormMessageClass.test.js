import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import getFormMessageClass from './getFormMessageClass';

describe('#UI #Forms #Validation #Bootstrap #getFormMessageClass', function() {
    it('should return the error class.', function() {
        expect(getFormMessageClass(ErrorLevel.error)).toEqual('has-danger');
    });

    it('should return the warning class.', function() {
        expect(getFormMessageClass(ErrorLevel.warning)).toEqual('has-warning');
    });

    it('should return the info class.', function() {
        expect(getFormMessageClass(ErrorLevel.info)).toEqual('has-info');
    });

    it('should return an empty string.', function() {
        expect(getFormMessageClass(ErrorLevel.ok)).toEqual('');
    });
});