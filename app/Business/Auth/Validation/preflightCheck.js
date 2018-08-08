import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import checkIsMissing from 'Business/Validation/Lib/checkIsMissing';

function preflightCheck(data = {}) {
    const {username, password} = data;
    const usernameValidation = checkIsMissing(username);
    const passwordValidation = checkIsMissing(password);
    const result = [];

    if (usernameValidation !== ErrorLevel.ok) {
        result.push(new Message(usernameValidation, 'username', username, AuthValidationMessages.missingUserName));
    }

    if (passwordValidation !== ErrorLevel.ok) {
        result.push(new Message(passwordValidation, 'password', password, AuthValidationMessages.missingPassword));
    }

    return result;
}

export default preflightCheck;