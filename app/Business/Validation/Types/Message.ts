import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import { curry } from 'ramda';
import MessageProps from "Business/Validation/Types/MessageProps";

interface Message {
    readonly type: ErrorLevel;
    readonly field?: string;
    readonly value?: any;
    readonly message?: string;
}

function factory(type: ErrorLevel = ErrorLevel.error, props: MessageProps): Message {
    const { field, value, message } = props;

    return {
        type,
        field,
        value,
        message: message || '',
    };
}

const createMessage = curry(factory);

export default Message;
export { createMessage }