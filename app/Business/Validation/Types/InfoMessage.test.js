import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InfoMessage from 'Business/Validation/Types/InfoMessage';


describe('#Business #Validation #Types #InfoMessage', function() {
    it('should return a new message with an ErrorLevel of info', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(InfoMessage(data).type).toEqual(ErrorLevel.info);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(InfoMessage(data).field).toEqual(data.field);
        expect(InfoMessage(data).value).toEqual(data.value);
        expect(InfoMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for value and message', function() {
        const data = {
            field: 'test field'
        };

        expect(InfoMessage(data).type).toEqual(ErrorLevel.info);
        expect(InfoMessage(data).field).toEqual(data.field);
        expect(InfoMessage(data).value).toEqual(undefined);
        expect(InfoMessage(data).message).toEqual('');
    });
});