import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import OkMessage from 'Business/Validation/OkMessage';


describe('#Business #Validation #OkMessage', function() {
    it('should return a new message with an ErrorLevel of ok', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new OkMessage(data).type).toEqual(ErrorLevel.ok);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new OkMessage(data).field).toEqual(data.field);
        expect(new OkMessage(data).value).toEqual(data.value);
        expect(new OkMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for message', function() {
        const data = {
            field: 'test field'
        };

        expect(new OkMessage(data).type).toEqual(ErrorLevel.ok);
        expect(new OkMessage(data).field).toEqual(data.field);
        expect(new OkMessage(data).value).toEqual(undefined);
        expect(new OkMessage(data).message).toEqual('');
    });
});