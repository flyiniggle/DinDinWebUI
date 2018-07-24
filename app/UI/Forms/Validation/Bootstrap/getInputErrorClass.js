import isError from 'Business/Validation/isError';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';


// Business.Validation.Types.ErrorLevel => String
function getInputErrorClass(error) {
    if (isError(error) && error !== ErrorLevel.ok) {
        return 'is-invalid';
    }
    return '';
}

export default getInputErrorClass;