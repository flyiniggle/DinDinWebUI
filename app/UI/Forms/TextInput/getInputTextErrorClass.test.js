import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import getInputTextErrorClass from './getInputTextErrorClass';


describe('#UI #Forms #TextInput #getInputTextErrorClass', function() {
    it('should return the error class.', function() {
        expect(getInputTextErrorClass(ErrorLevel.error)).toEqual('errorInputText');
    });

    it('should return the warning class.', function() {
        expect(getInputTextErrorClass(ErrorLevel.warning)).toEqual('waringInputText');
    });

    it('should return the info class.', function() {
        expect(getInputTextErrorClass(ErrorLevel.info)).toEqual('infoInputText');
    });

    it('should return an empty string.', function() {
        expect(getInputTextErrorClass(ErrorLevel.ok)).toEqual('');
    });
});