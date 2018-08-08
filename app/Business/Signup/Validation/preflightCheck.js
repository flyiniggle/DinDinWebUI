import { checkPassword } from 'Business/Auth/Validation/preflightCheck';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';

function preflightCheck({ password }) {
    const errors = [];

    const passwordError = checkPassword(password);

    if (passwordError !== ErrorLevel.ok) {
        errors.push(new Message(passwordError, 'password', password, 'required'));
    }
    return errors;
}

export default preflightCheck;