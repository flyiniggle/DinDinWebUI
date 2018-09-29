import IMessage from "Business/Validation/Types/Message";

abstract class Message implements IMessage {
    readonly field?: string;
    readonly value?: any;
    readonly message?: string;

    constructor(props: IMessage) { 
        const { field, value, message } = props;

        this.field = field;
        this.value = value;
        this.message = message;
    }
}

export default Message;