import { curry, filter } from 'ramda';

// String => Business.Auth.Validation.Types.Message => Boolean
function getMessagesForField(field, messages) {
    const testMessage = message => message.field === field;

    return filter(testMessage, messages);
}

export default curry(getMessagesForField);