import ErrorLevel from 'Business/Validation/Types/ErrorLevel';


// Business.Validation.Types.ErrorLevel => String
function getErrorClassForInput(error) {
    let c;
    switch (error) {
    case ErrorLevel.error:
        c = 'error-input';
        break;
    case ErrorLevel.warning:
        c = 'warning-input';
        break;
    case ErrorLevel.info:
        c = 'info-input';
        break;
    case ErrorLevel.ok:
        c = '';
        break;
    default:
        c = '';
        break;
    }

    return c;
}

export default getErrorClassForInput;