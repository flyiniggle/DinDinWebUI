import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

// ErrorLevel => String (Bootstrap css class name)
function getErrorClassForAlert(error) {
    let feedbackTextClass;

    if (error === ErrorLevel.error) {
        feedbackTextClass = 'alert-danger';
    } else if (error === ErrorLevel.warning) {
        feedbackTextClass = 'alert-warning';
    } else if (error === ErrorLevel.info) {
        feedbackTextClass = 'alert-info';
    } else {
        feedbackTextClass = '';
    }

    return feedbackTextClass;
}

export default getErrorClassForAlert;