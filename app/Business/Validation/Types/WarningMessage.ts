import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message, {createMessage} from 'Business/Validation/Types/Message';
import MessageProps from "Business/Validation/Types/MessageProps";

interface WarningMessage extends Message {
    type: ErrorLevel.warning
}

const createWarningMessage: (props: MessageProps) => WarningMessage = createMessage(ErrorLevel.warning)

export default WarningMessage;
export {createWarningMessage};