import { createErrorMessage } from "Business/Validation/Types/ErrorMessage";
import Message from "Business/Validation/Types/Message";


function responseCheck(responseData): Array<Message> {
    const errors = [];
    if (responseData.non_field_errors) {
        if (responseData.non_field_errors.includes('Unable to log in with provided credentials.')) {
            errors.push(createErrorMessage({
                field: 'password',
                value: '',
                message: 'Username and password did not match.'
            }));
        } else {
            //just show one error at a time, even if there's more than one
        }
    } else if (!responseData.token) {
        errors.push(createErrorMessage({
            field: 'password',
            value: '',
            message: 'It is not possible to log in right now.'
        }));
    }

    return errors;
}

export default responseCheck;