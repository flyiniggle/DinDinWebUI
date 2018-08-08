import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

function checkPasswordRepeat(passwordRepeat) {
    return (passwordRepeat && passwordRepeat.toString()) ? ErrorLevel.ok : ErrorLevel.error;
}

export default checkPasswordRepeat;