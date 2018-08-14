import ErrorMessage from 'Business/Validation/Types/ErrorMessage';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import fieldIsEmpty from 'Business/Validation/Lib/fieldIsEmpty';

function preflightCheck(data: { username?: string, password?: string } = {}): Array<any> {
    const {username, password} = data;
    const result = [];

    if (fieldIsEmpty(username) === true) {
        result.push(ErrorMessage({
            field: 'username',
            value: username,
            message: AuthValidationMessages.missingUserName
        }));
    }

    if (fieldIsEmpty(password) === true) {
        result.push(ErrorMessage({
            field: 'password',
            value: password,
            message: AuthValidationMessages.missingPassword
        }));
    }

    return result;
}

export default preflightCheck;