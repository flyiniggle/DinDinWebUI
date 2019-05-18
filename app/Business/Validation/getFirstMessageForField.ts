import getMessagesForField from 'Business/Validation/getMessagesForField';
import { Maybe } from 'true-myth';
import { curry } from 'ramda';
import Message from "Business/Validation/Types/Message";


// String => [Message] => Maybe(Message)
const getFirstMessageForField = curry(function(field: string, messages: Message[]): Maybe<Message> {
    return Maybe.first(getMessagesForField(field, messages))
});


export default getFirstMessageForField;