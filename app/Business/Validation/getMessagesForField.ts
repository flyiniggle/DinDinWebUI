import { curry, propEq } from 'ramda';
import Message from "Business/Validation/Types/Message";

// String => [Message] => [Message]
function getMessagesForField(field: string, messages: Array<Message>): Array<Message> {

    return messages.filter(propEq('field', field));
}

export default curry(getMessagesForField);