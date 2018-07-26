import isError from 'Business/Validation/isError';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import React from 'react';
import PropTypes from 'prop-types';

import './InlineFeedback.sass';


function InlineFeedback(props) {
    return <span className={ getErrorClassForText(props.errorLevel) }>{props.message}</span>;
}

InlineFeedback.propTypes = {
    message: PropTypes.string.isRequired,
    errorLevel: function(props, propName) {
        if (!isError(props[propName])) {
            return new TypeError('errorLevel prop must be an ErrorLevel variant.');
        }
    }
};

export default InlineFeedback;