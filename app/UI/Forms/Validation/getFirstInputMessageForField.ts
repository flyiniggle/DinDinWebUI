import getFirstMessageForField from 'Business/Validation/getFirstMessageForField';
import { curry } from 'ramda';
import {createInputMessage, default as InputMessage} from 'UI/Forms/Validation/InputMessage';
import Message from "Business/Validation/Types/Message";


// [Message] => InputMessage || undefined
const getFirstInputMessageForField = curry(function(field: string, messages: Array<Message>): InputMessage | undefined {
    return getFirstMessageForField(field, messages)
        .map(createInputMessage)
        .unwrapOr(undefined);
});

export default getFirstInputMessageForField;