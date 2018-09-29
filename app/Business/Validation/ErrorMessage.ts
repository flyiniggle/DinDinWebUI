
import Message from 'Business/Validation/Message';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import IErrorMessage from 'Business/Validation/Types/ErrorMessage'

class ErrorMessage extends Message implements IErrorMessage {
    readonly type = ErrorLevel.error
}

export default ErrorMessage;