import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message, { createMessage } from 'Business/Validation/Types/Message';
import MessageProps from "Business/Validation/Types/MessageProps";

interface ErrorMessage extends Message {
    type: ErrorLevel.error
}

const createErrorMessage: (props: MessageProps) => ErrorMessage = createMessage(ErrorLevel.error)

export default ErrorMessage;
export { createErrorMessage };