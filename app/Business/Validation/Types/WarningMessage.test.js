import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import WarningMessage from 'Business/Validation/Types/WarningMessage';


describe('#Business #Validation #Types #WarningMessage', function() {
    it('should return a new message with an ErrorLevel of warning', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(WarningMessage(data).type).toEqual(ErrorLevel.warning);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(WarningMessage(data).field).toEqual(data.field);
        expect(WarningMessage(data).value).toEqual(data.value);
        expect(WarningMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for value and message', function() {
        const data = {
            field: 'test field'
        };

        expect(WarningMessage(data).type).toEqual(ErrorLevel.warning);
        expect(WarningMessage(data).field).toEqual(data.field);
        expect(WarningMessage(data).value).toEqual('');
        expect(WarningMessage(data).message).toEqual('');
    });
});