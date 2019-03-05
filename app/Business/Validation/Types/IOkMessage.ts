import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';

interface IOkMessage extends Message {
    type: ErrorLevel.ok
}

export default IOkMessage;