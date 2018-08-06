import isError from 'Business/Validation/isError';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import React from 'react';
import PropTypes from 'prop-types';

import './TooltipFeedback.sass';


function InlineFeedback(props) {
    return props.active ? <div className={ `tooltipFeedback ${getErrorClassForText(props.errorLevel)} alert alert-danger` } role="alert">{props.message}</div> : null;
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