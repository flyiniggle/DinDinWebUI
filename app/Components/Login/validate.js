import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';

function checkUsername(username) {
    return (username && username.toString()) ? ErrorLevel.ok : ErrorLevel.error;
}

function checkPassword(password) {
    return (password && password.toString()) ? ErrorLevel.ok : ErrorLevel.error;

}

function check(data = {}) {
    const {username, password} = data;
    const usernameValidation = checkUsername(username);
    const passwordValidation = checkPassword(password);
    const result = [];

    if (usernameValidation !== ErrorLevel.ok) {
        result.push(new Message(usernameValidation, 'username', username, 'required'));
    }

    if (passwordValidation !== ErrorLevel.ok) {
        result.push(new Message(passwordValidation, 'password', password, 'required'));
    }

    return result;
}

export default check;

export {
    checkPassword,
    checkUsername
};