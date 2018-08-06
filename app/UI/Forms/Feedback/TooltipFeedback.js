import isError from 'Business/Validation/isError';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import React from 'react';
import PropTypes from 'prop-types';

import './TooltipFeedback.sass';

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

function InlineFeedback(props) {
    return props.active ? <div className={ `tooltipFeedback alert ${getErrorClassForAlert(props.errorLevel)}` } role="alert">{props.message}</div> : null;
}

InlineFeedback.propTypes = {
    message: PropTypes.string.isRequired,
    errorLevel: function(props, propName) {
        if (!isError(props[propName])) {
            return new TypeError('errorLevel prop must be an ErrorLevel variant.');
        }
    },
    active: PropTypes.bool
};

InlineFeedback.defaultProps = {
    active: false
};

export default InlineFeedback;