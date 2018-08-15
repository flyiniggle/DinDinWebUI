import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { createErrorMessage } from 'Business/Validation/Types/ErrorMessage';


describe('#Business #Validation #Types #ErrorMessage', function() {
    it('should return a new message with an ErrorLevel of error', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(createErrorMessage(data).type).toEqual(ErrorLevel.error);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(createErrorMessage(data).field).toEqual(data.field);
        expect(createErrorMessage(data).value).toEqual(data.value);
        expect(createErrorMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for message', function() {
        const data = {
            field: 'test field'
        };

        expect(createErrorMessage(data).field).toEqual(data.field);
        expect(createErrorMessage(data).value).toEqual(undefined);
        expect(createErrorMessage(data).message).toEqual('');
    });
});