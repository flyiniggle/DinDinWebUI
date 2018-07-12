import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextInput.sass';


function getErrorState(props) {
    const { errorMessage, warningMessage, infoMessage } = props;
    const ErrorState = function(message, messageClass, inputClass) {
        return {
            message,
            messageClass,
            inputClass
        };
    };
    let errorState;

    if (errorMessage) {
        errorState = new ErrorState(errorMessage, styles.errorMessage, styles.errorInput);
    } else if (warningMessage) {
        errorState = new ErrorState(warningMessage, styles.warningMessage, styles.warningInput);
    } else if (infoMessage) {
        errorState = new ErrorState(infoMessage, styles.infoMessage, styles.infoInput);
    } else {
        errorState = new ErrorState('', '', '');
    }

    return errorState;
}

const TextInput = function(props) {
    const { placeholder, errorMessage, warningMessage, infoMessage, value } = props;
    const errorLevelState = getErrorState({ errorMessage, warningMessage, infoMessage });

    return (
        <div>
            <input
                type="text"
                value={ value }
                placeholder={ placeholder }
                className={ errorLevelState.inputClass } />
            <span className={ `${errorLevelState.messageClass} ${styles.errorStateMessage}` }>{errorLevelState.message}</span>
        </div>
    );
};

TextInput.propTypes = {
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    warningMessage: PropTypes.string,
    infoMessage: PropTypes.string,
    value: PropTypes.string
};

TextInput.defaultProps = {
    placeholder: '',
    errorMessage: '',
    warningMessage: '',
    infoMessage: '',
    value: ''
};

export default TextInput;

export { getErrorState };