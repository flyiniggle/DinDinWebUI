import { createErrorMessage } from 'Business/Validation/Types/ErrorMessage';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import SignupValidationMessages from 'Business/Signup/Validation/Messages';
import fieldIsEmpty from 'Business/Validation/Lib/fieldIsEmpty';
import regexp from 'Business/Lib/regexp';

function preflightCheck({ password, username, email, passwordRepeat }) {
    const errors = [];

    if (fieldIsEmpty(username) === true) {
        errors.push(createErrorMessage({
            field: 'username',
            value: username,
            message: AuthValidationMessages.missingUserName
        }));
    }

    if ((fieldIsEmpty(password) === true) && (fieldIsEmpty(passwordRepeat) === true)) {
        errors.push(createErrorMessage({
            field: 'password',
            value: password,
            message: SignupValidationMessages.missingPassword
        }));
        errors.push(createErrorMessage({
            field: 'passwordRepeat',
            value: passwordRepeat,
            message: SignupValidationMessages.missingPasswordRepeat
        }));
    } else if (password !== passwordRepeat) {
        errors.push(createErrorMessage({
            field: 'passwordRepeat',
            value: passwordRepeat,
            message: SignupValidationMessages.passwordsDoNotMatch
        }));
    }

    if (fieldIsEmpty(email) === true) {
        errors.push(createErrorMessage({
            field: 'email',
            value: email,
            message: SignupValidationMessages.missingEmail
        }));
    } else if (!regexp.email.test(email)) {
        errors.push(createErrorMessage({
            field: 'email',
            value: email,
            message: SignupValidationMessages.invalidEmail
        }));
    }
    return errors;
}

export default preflightCheck;