import { createErrorMessage } from "Business/Validation/Types/ErrorMessage";
import Message from "Business/Validation/Types/Message";
import {create} from "domain";

interface ErrorResponseProps {
    username?: Array<string>;
    password?: Array<string>;
    email?: Array<string>;
}

function responseCheck(responseData: ErrorResponseProps): Message[] {
    const errors = [];

    if(responseData.password) {
        errors.push(createErrorMessage({
            field: 'password',
            message: responseData.password.pop()
        }));
    }

    if(responseData.username) {
        const firstError = responseData.username[0];

        if(firstError === "This field must be unique.") {
            errors.push(createErrorMessage({
                field: 'username',
                message: 'Oops, that username is already in use. Pick another!'
            }));
        } else {
            errors.push(createErrorMessage({
                field: 'username',
                message: responseData.username.pop()
            }));
        }
    }

    if(responseData.email) {
        errors.push(createErrorMessage({
            field: 'email',
            message: responseData.email.pop()
        }))
    }

    return errors
}

export default responseCheck;