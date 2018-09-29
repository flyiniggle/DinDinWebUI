
import Message from 'Business/Validation/Message';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import IInfoMessage from 'Business/Validation/Types/InfoMessage'

class InfoMessage extends Message implements IInfoMessage {
    readonly type = ErrorLevel.info;
}

export default InfoMessage;