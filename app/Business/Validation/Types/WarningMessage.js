import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';


function WarningMessage({field, value = '', message = ''}) {
    return new Message(ErrorLevel.warning, field, value, message);
}

export default WarningMessage;