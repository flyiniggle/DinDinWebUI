import IMessage from "Business/Validation/Types/Message";
import ErrorLevel from './Types/ErrorLevel';
import uuid from 'Business/Lib/uuid';


interface IMessageProps {
    field?: string;
    value?: any;
    message?: string;
}

abstract class Message implements IMessage {
    protected _id: string;
    readonly field?: string;
    readonly value?: any;
    readonly message?: string;
    readonly type?: ErrorLevel;

    constructor(props: IMessageProps) { 
        const { field, value, message } = props;

        this._id = uuid();
        this.field = field;
        this.value = value;
        this.message = message || '';
    }

    get id(): string {
        return this.id
    }
}

export default Message;