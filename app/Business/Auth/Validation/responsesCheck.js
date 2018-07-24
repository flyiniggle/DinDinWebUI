import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Message from 'Business/Validation/Types/Message';


function responseCheck(responseData) {
    const errors = [];
    if (responseData.non_field_errors) {
        if (responseData.non_field_errors.includes('Unable to log in with provided credentials.')) {
            errors.push(new Message(ErrorLevel.error, 'password', '', 'Username and password did not match.'));
        } else {
            //just show one error at a time, even if there's more than one
            errors.push(new Message(ErrorLevel.error, 'password', '', responseData.non_field_errors[0]));
        }
    } else if (!responseData.token) {
        errors.push(new Message(ErrorLevel.error, 'password', '', 'It is not possible to log in right now.'));
    }

    return errors;
}

export default responseCheck;