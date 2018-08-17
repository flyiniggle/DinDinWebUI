import { createErrorMessage } from "Business/Validation/Types/ErrorMessage";

function responseCheck(responseData) {
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

    return errors
}

export default responseCheck;