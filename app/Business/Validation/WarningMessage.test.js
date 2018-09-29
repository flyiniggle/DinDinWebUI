import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import WarningMessage from 'Business/Validation/WarningMessage';


describe('#Business #Validation #WarningMessage', function() {
    it('should return a new message with an ErrorLevel of warning', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new WarningMessage(data).type).toEqual(ErrorLevel.warning);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(new WarningMessage(data).field).toEqual(data.field);
        expect(new WarningMessage(data).value).toEqual(data.value);
        expect(new WarningMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for value and message', function() {
        const data = {
            field: 'test field'
        };

        expect(new WarningMessage(data).type).toEqual(ErrorLevel.warning);
        expect(new WarningMessage(data).field).toEqual(data.field);
        expect(new WarningMessage(data).value).toEqual(undefined);
        expect(new WarningMessage(data).message).toEqual('');
    });
});