import Message from 'Business/Validation/Types/Message';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InputMessage from 'UI/Forms/Validation/InputMessage';

import getFirstInputMessageForField from './getFirstInputMessageForField';

describe('#UI #Forms #Validation #getFirstInputMessageForField', function() {
    it('should return an InputMessage from the first message for the specified field.', function() {
        const expected = new Message(ErrorLevel.warning, 'field5');
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
        const result = getFirstInputMessageForField('field5', messages);

        expect(result).toEqual(new InputMessage(expected));
    });

    it('should return undefined list if there are no messages with a matching field.', function() {
        const messages = [
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field2'),
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field5'),
            new Message(ErrorLevel.error, 'field1'),
            new Message(ErrorLevel.error, 'field4'),
            new Message(ErrorLevel.error, 'field4')
        ];
        const result = getFirstInputMessageForField('no', messages);

        expect(result).toEqual(undefined);
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
        const curried = getFirstInputMessageForField('field5');

        expect(curried).toBeInstanceOf(Function);

        const result = curried(messages);

        expect(result).toEqual(new InputMessage(expected));
    });
});