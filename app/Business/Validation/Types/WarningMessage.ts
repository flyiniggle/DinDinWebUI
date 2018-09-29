import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';

interface WarningMessage extends Message {
    type: ErrorLevel.warning
}

export default WarningMessage;