import Message from 'Business/Validation/Types/Message';
import getFirstMessageForField from 'Business/Validation/getFirstMessageForField';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Maybe from 'folktale/maybe';

describe('#Business #Validation #getFirstMessageForField', function() {
    it('should return the first message for the specified field.', function() {
        const expected = new Message(ErrorLevel.error, 'field5');
        const messages = [
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field2'),
            new Message(ErrorLevel.error, 'field1'),
            expected,
            new Message(ErrorLevel.error, 'field5'),
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field4'),
            new Message(ErrorLevel.error, 'field4')
        ];
        const result = getFirstMessageForField('field5', messages).getOrElse('');

        expect(result).toBe(expected);
    });

    it('should return Nothing list if there are no messages with a matching field.', function() {
        const messages = [
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field2'),
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field5'),
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field4'),
            new Message(ErrorLevel.error, 'field4')
        ];
        const result = getFirstMessageForField('no', messages);

        expect(result).toEqual(Maybe.Nothing());
    });

    it('should be curried.', function() {
        const expected = new Message(ErrorLevel.error, 'field5');
        const messages = [
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field2'),
            new Message(ErrorLevel.error, 'field1'),
            expected,
            new Message(ErrorLevel.error, 'field5'),
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field4'),
            new Message(ErrorLevel.error, 'field4')
        ];
        const curried = getFirstMessageForField('field5');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages).getOrElse('');

        expect(result).toBe(expected);
    });
});