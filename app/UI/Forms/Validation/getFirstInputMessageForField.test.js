import WarningMessage from 'Business/Validation/WarningMessage';
import ErrorMessage from 'Business/Validation/ErrorMessage';
import { createInputMessage } from 'UI/Forms/Validation/InputMessage';

import getFirstInputMessageForField from './getFirstInputMessageForField';


describe('#UI #Forms #Validation #getFirstInputMessageForField', function() {
    it('should return an InputMessage from the first message for the specified field.', function() {
        const expected = new WarningMessage({field: 'field5'});
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            expected,
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const result = getFirstInputMessageForField('field5', messages);

        expect(result).toEqual(createInputMessage(expected));
    });

    it('should return undefined list if there are no messages with a matching field.', function() {
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const result = getFirstInputMessageForField('no', messages);

        expect(result).toEqual(undefined);
    });

    it('should be curried.', function() {
        const expected = new ErrorMessage('field5');
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            expected,
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const curried = getFirstInputMessageForField('field5');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages);

        expect(result).toEqual(createInputMessage(expected));
    });
});