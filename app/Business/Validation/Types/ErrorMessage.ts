import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';

interface ErrorMessage extends Message {
    type: ErrorLevel.error
}

export default ErrorMessage;