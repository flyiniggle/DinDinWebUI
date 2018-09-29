import { new ErrorMessage } from "Business/Validation/Types/ErrorMessage";
import Message from "Business/Validation/Types/Message";

interface ErrorResponseProps {
    username?: Array<string>;
    password?: Array<string>;
    email?: Array<string>;
}

function responseCheck(responseData: ErrorResponseProps): Message[] {
    const errors = [];

    if (responseData.password) {
        errors.push(new ErrorMessage({
            field: 'password',
            message: responseData.password.shift()
        }));
    }

    if (responseData.username) {
        const firstError = responseData.username[0];

        if (firstError === "This field must be unique.") {
            errors.push(new ErrorMessage({
                field: 'username',
                message: 'Oops, that username is already in use. Pick another!'
            }));
        } else {
            errors.push(new ErrorMessage({
                field: 'username',
                message: responseData.username.shift()
            }));
        }
    }

    if (responseData.email) {
        errors.push(new ErrorMessage({
            field: 'email',
            message: responseData.email.shift()
        }))
    }

    return errors
}

export default responseCheck;
export { ErrorResponseProps };