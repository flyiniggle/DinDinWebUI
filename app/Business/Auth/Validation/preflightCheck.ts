import ErrorMessage from 'Business/Validation/ErrorMessage';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import fieldIsEmpty from 'Business/Validation/Lib/fieldIsEmpty';
import Message from "Business/Validation/Types/Message";
import { Result } from "true-myth";

interface paramTypes {
    username?: string;
    password?: string;
}

function preflightCheck(data: paramTypes = {}): Result<paramTypes, Message[]> {
    const {username, password} = data;
    const errors = [];

    if (fieldIsEmpty(username) === true) {
        errors.push(new ErrorMessage({
            field: 'username',
            value: username,
            message: AuthValidationMessages.missingUserName
        }));
    }

    if (fieldIsEmpty(password) === true) {
        errors.push(new ErrorMessage({
            field: 'password',
            value: password,
            message: AuthValidationMessages.missingPassword
        }));
    }

    return errors.length ? Result.err(errors) : Result.ok(data);
}

export default preflightCheck;