import ErrorMessage from "Business/Validation/ErrorMessage";
import Message from "Business/Validation/Types/Message";

interface IMealEditorErrorResponseProps {
    name?: Array<string>;
}

function responseCheck(responseData: IMealEditorErrorResponseProps): Message[] {
    const errors = [];

    if (responseData.name) {
        errors.push(new ErrorMessage({
            field: 'name',
            message: responseData.name.shift()
        }));
    }

    return errors
}


export { IMealEditorErrorResponseProps }
export default responseCheck;