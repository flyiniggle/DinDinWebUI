import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InfoMessage from 'Business/Validation/InfoMessage';


describe('#Business #Validation #Types #InfoMessage', function() {
    it('should return a new message with an ErrorLevel of info', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new InfoMessage(data).type).toEqual(ErrorLevel.info);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new InfoMessage(data).field).toEqual(data.field);
        expect(new InfoMessage(data).value).toEqual(data.value);
        expect(new InfoMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for message', function() {
        const data = {
            field: 'test field'
        };

        expect(new InfoMessage(data).type).toEqual(ErrorLevel.info);
        expect(new InfoMessage(data).field).toEqual(data.field);
        expect(new InfoMessage(data).value).toEqual(undefined);
        expect(new InfoMessage(data).message).toEqual('');
    });
});