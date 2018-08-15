import ErrorType from 'Business/Validation/Types/ErrorLevel';

import { createMessage } from './Message';

describe('#Business #Validation #Types #Message', function() {
    it('should return an error message.', function() {
        const data = {
            field: 'testField',
            value: 5,
            message: 'that is an error'
        };
        const m = createMessage(undefined, data);

        expect(m.type).toEqual(ErrorType.error);
        expect(m.field).toEqual(data.field);
        expect(m.value).toEqual(data.value);
        expect(m.message).toEqual(data.message);
    });

    it('should return a warning message.', function() {
        const data = {
            field: 'testField',
            value: '5',
            message: 'that is a warning'
        };
        const m = createMessage(ErrorType.warning, data);

        expect(m.type).toEqual(ErrorType.warning);
        expect(m.field).toEqual(data.field);
        expect(m.value).toEqual(data.value);
        expect(m.message).toEqual(data.message);
    });

    it('should return an info message.', function() {
        const data = {
            field: 'testField',
            value: [],
            message: 'that is some info'
        };
        const m = createMessage(ErrorType.info, data);

        expect(m.type).toEqual(ErrorType.info);
        expect(m.field).toEqual(data.field);
        expect(m.value).toEqual(data.value);
        expect(m.message).toEqual(data.message);
    });

    it('should be curried.', function() {
        const createInfo = createMessage(ErrorType.info);
        const data = {
            field: 'testField',
            value: {},
            message: 'that is some info'
        };
        const m = createInfo(data);

        expect(m.type).toEqual(ErrorType.info);
        expect(m.field).toEqual(data.field);
        expect(m.value).toEqual(data.value);
        expect(m.message).toEqual(data.message);
    });
});