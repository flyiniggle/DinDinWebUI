import {createMessage} from 'Business/Validation/Types/Message';
import getFirstMessageForField from 'Business/Validation/getFirstMessageForField';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { Maybe } from 'true-myth';

describe('#Business #Validation #getFirstMessageForField', function() {
    it('should return the first message for the specified field.', function() {
        const expected = createMessage(ErrorLevel.error, { field: 'field5' });
        const messages = [
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field2' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            expected,
            createMessage(ErrorLevel.error, { field: 'field5' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field4' }),
            createMessage(ErrorLevel.error, { field: 'field4' })
        ];
        const result = getFirstMessageForField('field5', messages).unwrapOr('');

        expect(result).toBe(expected);
    });

    it('should return Nothing list if there are no messages with a matching field.', function() {
        const messages = [
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field2' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field5' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field4' }),
            createMessage(ErrorLevel.error, { field: 'field4' })
        ];
        const result = getFirstMessageForField('no', messages);

        expect(result).toEqual(Maybe.nothing());
    });

    it('should be curried.', function() {
        const expected = createMessage(ErrorLevel.error, { field: 'field5' });
        const messages = [
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field2' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            expected,
            createMessage(ErrorLevel.error, { field: 'field5' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field4' }),
            createMessage(ErrorLevel.error, { field: 'field4' })
        ];
        const curried = getFirstMessageForField('field5');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages).unwrapOr('');

        expect(result).toBe(expected);
    });
});