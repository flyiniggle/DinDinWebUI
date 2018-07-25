import ErrorLevel from 'Business/Validation/Types/ErrorLevel';


// Business.Validation.Types.ErrorLevel => String
function getErrorClassForText(error) {
    let feedbackTextClass;

    if (error === ErrorLevel.error) {
        feedbackTextClass = 'error-text';
    } else if (error === ErrorLevel.warning) {
        feedbackTextClass = 'warning-text';
    } else if (error === ErrorLevel.info) {
        feedbackTextClass = 'info-text';
    } else {
        feedbackTextClass = '';
    }

    return feedbackTextClass;
}

export default getErrorClassForText;