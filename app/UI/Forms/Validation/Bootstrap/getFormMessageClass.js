import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

// UI.Forms.Validation.InputMessage => String
function getFormMessageClass(error) {
    let c;
    switch (error) {
    case ErrorLevel.error:
        c = 'has-danger';
        break;
    case ErrorLevel.warning:
        c = 'has-warning';
        break;
    case ErrorLevel.info:
        c = 'has-info';
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

export default getFormMessageClass;