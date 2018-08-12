import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import ErrorMessage from 'Business/Validation/Types/ErrorMessage';


describe('#Business #Validation #Types #ErrorMessage', function() {
    it('should return a new message with an ErrorLevel of error', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(ErrorMessage(data).type).toEqual(ErrorLevel.error);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(ErrorMessage(data).field).toEqual(data.field);
        expect(ErrorMessage(data).value).toEqual(data.value);
        expect(ErrorMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for value and message', function() {
        const data = {
            field: 'test field'
        };

        expect(ErrorMessage(data).field).toEqual(data.field);
        expect(ErrorMessage(data).value).toEqual(undefined);
        expect(ErrorMessage(data).message).toEqual('');
    });
});