import getMessagesForField from 'Business/Validation/getMessagesForField';
import { Maybe } from 'true-myth';
import { curry, head, pipe } from 'ramda';
import Message from "Business/Validation/Types/Message";

// String => [Message] => Maybe(Message)
const getFirstMessageForField = curry(function(field: string, messages: Maybe<Message>[]): Maybe<Message> {
    const getMessages = getMessagesForField(field);

    return pipe(
        getMessages,
        head,
        Maybe.of
    )(messages);
});

export default getFirstMessageForField;