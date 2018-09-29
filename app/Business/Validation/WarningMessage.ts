
import Message from 'Business/Validation/Message';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import IWarningMessage from 'Business/Validation/Types/WarningMessage'

class WarningMessage extends Message implements IWarningMessage {
    readonly type = ErrorLevel.warning;
}

export default WarningMessage;