import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { createMessage } from 'Business/Validation/Types/Message';
import { createInputMessage } from 'DinDin/UI/Forms/Validation/InputMessage';


describe('#UI #Forms #Validation #InputMessage', function() {
    it('should return an object with an error type and message.', function() {
        const result = createInputMessage({type: ErrorLevel.error, message: 'You messed up!'});
        const expected = {
            message: 'You messed up!',
            errorLevel: ErrorLevel.error
        };

        expect(result).toEqual(expected);
    });

    it('should accept a Business.Validation.Types.Message.', function() {
        const message = createMessage(ErrorLevel.error, { field: 'some field', value: 5, message: 'You messed up!' });
        const expected = {
            message: 'You messed up!',
            errorLevel: ErrorLevel.error
        };

        expect(createInputMessage(message)).toEqual(expected);
    });
});