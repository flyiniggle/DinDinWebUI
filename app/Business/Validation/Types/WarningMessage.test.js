import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { createWarningMessage } from 'Business/Validation/Types/WarningMessage';


describe('#Business #Validation #Types #WarningMessage', function() {
    it('should return a new message with an ErrorLevel of warning', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(createWarningMessage(data).type).toEqual(ErrorLevel.warning);
    });

    it('should set other properties correctly', function() {
        const data = {
            field: 'test field',
            value: 'wrong!',
            message: 'you got it all wrong man'
        };

        expect(createWarningMessage(data).field).toEqual(data.field);
        expect(createWarningMessage(data).value).toEqual(data.value);
        expect(createWarningMessage(data).message).toEqual(data.message);
    });

    it('should set defaults for value and message', function() {
        const data = {
            field: 'test field'
        };

        expect(createWarningMessage(data).type).toEqual(ErrorLevel.warning);
        expect(createWarningMessage(data).field).toEqual(data.field);
        expect(createWarningMessage(data).value).toEqual(undefined);
        expect(createWarningMessage(data).message).toEqual('');
    });
});