import ErrorMessage from 'Business/Validation/Message';

import getMessagesForField from './getMessagesForField';

describe('#Business #Validation #getMessagesForField', function() {
    it('should return an array of messages for the specified field.', function() {
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const result = getMessagesForField('field1', messages);

        for (const m of result) {
            expect(m.field).toBe('field1');
        }

        expect(result.length).toBe(3);
    });

    it('should return an empty list if there are no messages with a matching field.', function() {
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const result = getMessagesForField('no', messages);

        expect(result).toEqual([]);
    });

    it('should be curried.', function() {
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const curried = getMessagesForField('field1');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages);

        for (const m of result) {
            expect(m.field).toBe('field1');
        }

        expect(result.length).toBe(3);
    });
});