import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';
import AuthValidationMessages from 'Business/Auth/Validation/Messages';
import SignupValidationMessages from 'Business/Signup/Validation/Messages';
import checkIsMissing from 'Business/Validation/Lib/checkIsMissing';
import regexp from 'Business/Lib/regexp';

function preflightCheck({ password, username, email, passwordRepeat }) {
    const errors = [];
    const passwordError = checkIsMissing(password);
    const usernameError = checkIsMissing(username);
    const passwordRepeatError = checkIsMissing(passwordRepeat);
    const emailMissingError = checkIsMissing(email);

    if (usernameError !== ErrorLevel.ok) {
        errors.push(new Message(usernameError, 'username', username, AuthValidationMessages.missingUserName));
    }

    if (passwordError !== ErrorLevel.ok && passwordRepeatError !== ErrorLevel.ok) {
        errors.push(new Message(passwordError, 'password', password, SignupValidationMessages.missingPassword));
        errors.push(new Message(passwordRepeatError, 'passwordRepeat', password, SignupValidationMessages.missingPasswordRepeat));
    } else if (password !== passwordRepeat) {
        errors.push(new Message(ErrorLevel.error, 'passwordRepeat', passwordRepeat, SignupValidationMessages.passwordsDoNotMatch));
    }

    if (emailMissingError !== ErrorLevel.ok) {
        errors.push(new Message(emailMissingError, 'email', email, SignupValidationMessages.missingEmail));
    } else if (!regexp.email.test(email)) {
        errors.push(new Message(ErrorLevel.error, 'email', email, SignupValidationMessages.invalidEmail));
    }
    return errors;
}

export default preflightCheck;