import { createErrorMessage } from 'Business/Validation/Types/ErrorMessage';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import fieldIsEmpty from 'Business/Validation/Lib/fieldIsEmpty';
import Message from "Business/Validation/Types/Message";

interface paramTypes {
    username?: string;
    password?: string;
}

function preflightCheck(data: paramTypes = {}): Array<Message> {
    const {username, password} = data;
    const result = [];

    if (fieldIsEmpty(username) === true) {
        result.push(createErrorMessage({
            field: 'username',
            value: username,
            message: AuthValidationMessages.missingUserName
        }));
    }

    if (fieldIsEmpty(password) === true) {
        result.push(createErrorMessage({
            field: 'password',
            value: password,
            message: AuthValidationMessages.missingPassword
        }));
    }

    return result;
}

export default preflightCheck;