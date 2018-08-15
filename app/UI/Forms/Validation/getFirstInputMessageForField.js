import getFirstMessageForField from 'Business/Validation/getFirstMessageForField';
import { curry } from 'ramda';
import InputMessage from 'UI/Forms/Validation/InputMessage';


// [Message] => InputMessage
const getFirstInputMessageForField = curry(function(field, messages) {
    return getFirstMessageForField(field, messages)
        .map(message => new InputMessage(message))
        .unwrapOr(undefined);
});

export default getFirstInputMessageForField;