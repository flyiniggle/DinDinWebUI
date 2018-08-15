import { createMessage } from 'Business/Validation/Types/Message';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { createInputMessage } from 'UI/Forms/Validation/InputMessage';

import getFirstInputMessageForField from './getFirstInputMessageForField';

describe('#UI #Forms #Validation #getFirstInputMessageForField', function() {
    it('should return an InputMessage from the first message for the specified field.', function() {
        const expected = createMessage(ErrorLevel.warning, {field: 'field5'});
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
        const result = getFirstInputMessageForField('field5', messages);

        expect(result).toEqual(createInputMessage(expected));
    });

    it('should return undefined list if there are no messages with a matching field.', function() {
        const messages = [
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field2' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field5' }),
            createMessage(ErrorLevel.error, { field: 'field1' }),
            createMessage(ErrorLevel.error, { field: 'field4' }),
            createMessage(ErrorLevel.error, { field: 'field4' })
        ];
        const result = getFirstInputMessageForField('no', messages);

        expect(result).toEqual(undefined);
    });

    it('should be curried.', function() {
        const expected = createMessage(ErrorLevel.error, 'field5');
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
        const curried = getFirstInputMessageForField('field5');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages);

        expect(result).toEqual(createInputMessage(expected));
    });
});