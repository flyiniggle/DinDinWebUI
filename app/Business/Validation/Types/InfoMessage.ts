import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message, {createMessage} from 'Business/Validation/Types/Message';
import MessageProps from "Business/Validation/Types/MessageProps";

interface InfoMessage extends Message {
    type: ErrorLevel.info
}

const createInfoMessage: (props: MessageProps) => InfoMessage = createMessage(ErrorLevel.info)

export default InfoMessage;
export {createInfoMessage};