import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import getInputErrorClass from './getInputErrorClass';

describe('#UI #Forms #Validation #Bootstrap #getInputErrorClass', function() {
    it('should return bootstrap\'s invalid form class if it is an error.', function() {
        expect(getInputErrorClass(ErrorLevel.error)).toEqual('is-invalid');
    });

    it('should return bootstrap\'s invalid form class if it is a warning.', function() {
        expect(getInputErrorClass(ErrorLevel.warning)).toEqual('is-invalid');
    });

    it('should return bootstrap\'s invalid form class if it is an info.', function() {
        expect(getInputErrorClass(ErrorLevel.info)).toEqual('is-invalid');
    });

    it('should return an empty string if it is ok.', function() {
        expect(getInputErrorClass(ErrorLevel.ok)).toEqual('');
    });

    it('should return an empty string by default.', function() {
        expect(getInputErrorClass()).toEqual('');
    });
});