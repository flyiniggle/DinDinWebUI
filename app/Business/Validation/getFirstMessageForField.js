import getMessagesForField from 'Business/Validation/getMessagesForField';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import { curry, head, pipe } from 'ramda';

// String => [Message] => Maybe(Message)
const getFirstMessageForField = curry(function(field, messages) {
    const getMessages = getMessagesForField(field);

    return pipe(
        getMessages,
        head,
        nullableToMaybe
    )(messages);
});

export default getFirstMessageForField;