import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

interface Message {
    readonly field?: string;
    readonly value?: any;
    readonly message?: string;
}

export default Message;