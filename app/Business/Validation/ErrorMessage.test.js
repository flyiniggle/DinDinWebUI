import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import ErrorMessage from 'Business/Validation/ErrorMessage';


describe('#Business #Validation #Types #ErrorMessage', function() {
    it('should return a new message with an ErrorLevel of error', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new ErrorMessage(data).type).toEqual(ErrorLevel.error);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new ErrorMessage(data).field).toEqual(data.field);
        expect(new ErrorMessage(data).value).toEqual(data.value);
        expect(new ErrorMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for message', function() {
        const data = {
            field: 'test field'
        };

        expect(new ErrorMessage(data).field).toEqual(data.field);
        expect(new ErrorMessage(data).value).toEqual(undefined);
        expect(new ErrorMessage(data).message).toEqual('');
    });
});