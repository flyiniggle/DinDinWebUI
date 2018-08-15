import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { createInfoMessage } from 'Business/Validation/Types/InfoMessage';


describe('#Business #Validation #Types #InfoMessage', function() {
    it('should return a new message with an ErrorLevel of info', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(createInfoMessage(data).type).toEqual(ErrorLevel.info);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(createInfoMessage(data).field).toEqual(data.field);
        expect(createInfoMessage(data).value).toEqual(data.value);
        expect(createInfoMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for message', function() {
        const data = {
            field: 'test field'
        };

        expect(createInfoMessage(data).type).toEqual(ErrorLevel.info);
        expect(createInfoMessage(data).field).toEqual(data.field);
        expect(createInfoMessage(data).value).toEqual(undefined);
        expect(createInfoMessage(data).message).toEqual('');
    });
});