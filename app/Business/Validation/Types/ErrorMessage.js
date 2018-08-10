import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';


function ErrorMessage({field, value = '', message = ''}) {
    return new Message(ErrorLevel.error, field, value, message);
}

export default ErrorMessage;