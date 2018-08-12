import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';


function InfoMessage({field, value, message}) {
    return new Message(ErrorLevel.info, field, value, message);
}

export default InfoMessage;