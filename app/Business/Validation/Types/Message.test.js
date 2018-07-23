import ErrorType from 'Business/Validation/Types/ErrorLevel';

import Message from './Message';

describe('#Business #Validation #Types #Message', function() {
    it('should return an error message.', function() {
        const field = 'testField';
        const value = 5;
        const message = 'that is an aerror';
        const m = new Message(ErrorType.error, field, value, message);

        expect(m.type).toEqual(ErrorType.error);
        expect(m.field).toEqual(field);
        expect(m.value).toEqual(value);
        expect(m.message).toEqual(message);
    });

    it('should return a warning message.', function() {
        const field = 'testField';
        const value = '5';
        const message = 'that is a warning';
        const m = new Message(ErrorType.warning, field, value, message);

        expect(m.type).toEqual(ErrorType.warning);
        expect(m.field).toEqual(field);
        expect(m.value).toEqual(value);
        expect(m.message).toEqual(message);
    });

    it('should return an info message.', function() {
        const field = 'testField';
        const value = [];
        const message = 'that is some info';
        const m = new Message(ErrorType.info, field, value, message);

        expect(m.type).toEqual(ErrorType.info);
        expect(m.field).toEqual(field);
        expect(m.value).toEqual(value);
        expect(m.message).toEqual(message);
    });

    it('should throw an error if the type param is not an ErrorType.', function() {
        const thrower = () => new Message('lalala', 'testField', 5, 'no');

        expect(thrower).toThrow('"type" parameter must be an ErrorLevel value.');
    });

    it('should throw an error if the field param is missing.', function() {
        const thrower = () => new Message(ErrorType.error);

        expect(thrower).toThrow('"field" parameter is required.');
    });
});