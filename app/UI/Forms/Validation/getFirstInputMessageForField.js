import getFirstMessageForField from 'Business/Validation/getFirstMessageForField';
import { curry } from 'ramda';
import { createInputMessage } from 'UI/Forms/Validation/InputMessage';


// [Message] => InputMessage
const getFirstInputMessageForField = curry(function(field, messages) {
    return getFirstMessageForField(field, messages)
        .map(createInputMessage)
        .unwrapOr(undefined);
});

export default getFirstInputMessageForField;