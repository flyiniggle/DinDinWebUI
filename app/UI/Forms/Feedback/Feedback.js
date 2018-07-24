import isError from 'Business/Validation/isError';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import React from 'react';
import PropTypes from 'prop-types';

import './Feedback.sass';


function getFeedbackClass(errorLevel) {
    let feedbackTextClass;

    if (errorLevel === ErrorLevel.error) {
        feedbackTextClass = 'errorMessage';
    } else if (errorLevel === ErrorLevel.warning) {
        feedbackTextClass = 'warningMessage';
    } else if (errorLevel === ErrorLevel.info) {
        feedbackTextClass = 'infoMessage';
    } else {
        feedbackTextClass = '';
    }

    return feedbackTextClass;
}

function Feedback(props) {
    return <span className={ getFeedbackClass(props.errorLevel) }>{props.message}</span>;
}

Feedback.propTypes = {
    message: PropTypes.string.isRequired,
    errorLevel: function(props, propName) {
        if (!isError(props[propName])) {
            return new TypeError('errorLevel prop must be an ErrorLevel variant.');
        }
    }
};

export default Feedback;