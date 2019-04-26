import ErrorMessage from 'Business/Validation/ErrorMessage';
import AuthValidationMessages from 'Business/Auth/Authenticate/Validation/Messages';
import SignupValidationMessages from 'Business/Signup/Validation/Messages';
import { SignupProps } from "Business/Signup/Service";
import fieldIsEmpty from 'Business/Validation/Lib/fieldIsEmpty';
import regexp from 'Business/Lib/regexp';
import Message from "Business/Validation/Types/Message";
import { Result } from 'true-myth';


interface SignupParams {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}

function preflightCheck({ password, username, email, passwordRepeat }: SignupParams): Result<SignupProps, Message[]> {
    const errors = [];

    if (fieldIsEmpty(username) === true) {
        errors.push(new ErrorMessage({
            field: 'username',
            value: username,
            message: AuthValidationMessages.missingUserName
        }));
    }

    if ((fieldIsEmpty(password) === true) && (fieldIsEmpty(passwordRepeat) === true)) {
        errors.push(new ErrorMessage({
            field: 'password',
            value: password,
            message: SignupValidationMessages.missingPassword
        }));
        errors.push(new ErrorMessage({
            field: 'passwordRepeat',
            value: passwordRepeat,
            message: SignupValidationMessages.missingPasswordRepeat
        }));
    } else if (password !== passwordRepeat) {
        errors.push(new ErrorMessage({
            field: 'passwordRepeat',
            value: passwordRepeat,
            message: SignupValidationMessages.passwordsDoNotMatch
        }));
    }

    if (fieldIsEmpty(email) === true) {
        errors.push(new ErrorMessage({
            field: 'email',
            value: email,
            message: SignupValidationMessages.missingEmail
        }));
    } else if (!regexp.email.test(email)) {
        errors.push(new ErrorMessage({
            field: 'email',
            value: email,
            message: SignupValidationMessages.invalidEmail
        }));
    }

    return errors.length ? Result.err(errors) : Result.ok({ username, email, password });
}

export default preflightCheck;