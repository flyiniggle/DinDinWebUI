import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';

interface InfoMessage extends Message {
    type: ErrorLevel.info
}

export default InfoMessage;