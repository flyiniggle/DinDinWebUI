import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';

function checkUsername(username) {
    return (username && username.toString()) ? ErrorLevel.ok : ErrorLevel.error;
}

function checkPassword(password) {
    return (password && password.toString()) ? ErrorLevel.ok : ErrorLevel.error;

}

function preflightCheck(data = {}) {
    const {username, password} = data;
    const usernameValidation = checkUsername(username);
    const passwordValidation = checkPassword(password);
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

export {
    checkPassword,
    checkUsername
};