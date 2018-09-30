import ErrorMessage from 'Business/Validation/ErrorMessage';
import getFirstMessageForField from 'Business/Validation/getFirstMessageForField';
import { Maybe } from 'true-myth';

describe('#Business #Validation #getFirstMessageForField', function() {
    it('should return the first message for the specified field.', function() {
        const expected = new ErrorMessage({ field: 'field5' });
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
        const result = getFirstMessageForField('field5', messages).unwrapOr('');

        expect(result).toBe(expected);
    });

    it('should return Nothing list if there are no messages with a matching field.', function() {
        const messages = [
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field2' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field5' }),
            new ErrorMessage({ field: 'field1' }),
            new ErrorMessage({ field: 'field4' }),
            new ErrorMessage({ field: 'field4' })
        ];
        const result = getFirstMessageForField('no', messages);

        expect(result).toEqual(Maybe.nothing());
    });

    it('should be curried.', function() {
        const expected = new ErrorMessage({ field: 'field5' });
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
        const curried = getFirstMessageForField('field5');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages).unwrapOr('');

        expect(result).toBe(expected);
    });
});