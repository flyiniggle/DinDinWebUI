import ErrorLevel from 'Business/Validation/Types/ErrorLevel';


// Business.Validation.Types.ErrorLevel => String
function getInputTextErrorClass(error) {
    let feedbackTextClass;

    if (error === ErrorLevel.error) {
        feedbackTextClass = 'errorInputText';
    } else if (error === ErrorLevel.warning) {
        feedbackTextClass = 'waringInputText';
    } else if (error === ErrorLevel.info) {
        feedbackTextClass = 'infoInputText';
    } else {
        feedbackTextClass = '';
    }

    return feedbackTextClass;
}

export default getInputTextErrorClass;