import ErrorMessage from "Business/Validation/ErrorMessage";
import Message from "Business/Validation/Types/Message";

interface IMealCreatorErrorResponseProps {
    name?: Array<string>;
}

function responseCheck(responseData: IMealCreatorErrorResponseProps): Message[] {
    const errors = [];

    if (responseData.name) {
        errors.push(new ErrorMessage({
            field: 'name',
            message: responseData.name.shift()
        }));
    }

    return errors
}


export { IMealCreatorErrorResponseProps }
export default responseCheck;