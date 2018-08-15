import Message from "Business/Validation/Types/Message";
import ErrorLevel from "Business/Validation/Types/ErrorLevel";

interface InputMessage {
    readonly errorLevel: ErrorLevel,
    readonly message: string
}

//Message => InputMessage
function createInputMessage(m: Message): InputMessage {
    return {
        errorLevel: m.type,
        message: m.message
    };
}

export default InputMessage;
export { createInputMessage };