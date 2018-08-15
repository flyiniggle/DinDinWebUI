import { curry, filter } from 'ramda';
import Message from "Business/Validation/Types/Message";

// String => [Message] => [Message]
function getMessagesForField(field: string, messages: Array<Message>): Array<Message> {
    const testMessage = message => message.field === field;

    return filter(testMessage, messages);
}

export default curry(getMessagesForField);