import isError from 'Business/Validation/isError';

//Business.Validation.Types.ErrorLevel => String => {}
function InputMessage(m) {
    if (!m) {
        throw new TypeError('Provide a message.');
    }
    const { type, message } = m;

    if (!isError(type)) {
        throw new TypeError('Type must be a valid error type.');
    }

    return Object.freeze({
        errorLevel: type,
        message: message
    });
}

export default InputMessage;