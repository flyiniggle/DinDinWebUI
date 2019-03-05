
import Message from 'Business/Validation/Message';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import IOkMessage from 'Business/Validation/Types/IOkMessage'

class OkMessage extends Message implements IOkMessage {
    readonly type = ErrorLevel.ok;
}

export default OkMessage;