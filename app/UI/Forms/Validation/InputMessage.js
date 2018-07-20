import isError from 'Business/Validation/isError';

//Business.Validation.Types.ErrorLevel => String => {}
function InputMessage(type, message) {
    if (!isError(type)) {
        throw new TypeError('Type must be a valid error type.');
    }

    return Object.freeze({
        errorLevel: type,
        message: message
    });
}

export default InputMessage;