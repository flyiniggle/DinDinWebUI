import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getInputTextErrorClass from 'DinDin/UI/Forms/TextInput/getInputTextErrorClass';
import getFormMessageClass from 'DinDin/UI/Forms/Validation/Bootstrap/getFormMessageClass';
import getInputErrorClass from 'DinDin/UI/Forms/Validation/Bootstrap/getInputErrorClass';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import React from 'react';
import PropTypes from 'prop-types';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import { identity, prop } from 'ramda';

import './TextInput.sass';


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

const renderErrorMessage = function(message) {
    return <span className={ `${getFeedbackClass(message.errorLevel)} errorStateMessage` }>{message.message}</span>;
};

class TextInput extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        message: PropTypes.oneOfType([
            PropTypes.instanceOf(InputMessage),
            PropTypes.shape({
                errorLevel: PropTypes.oneOf(Object.values(ErrorLevel)),
                message: PropTypes.string
            })
        ]),
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        placeholder: '',
        message: undefined,
        value: '',
        onChange: identity
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            focusedAfterError: false
            //changedAfterError: true
        };
    }

    onFocus = () => {
        const errorMessage = this.props.message.message;

        if (errorMessage) {
            this.setState({ focusedAfterError: true });
        }
    };

    onBlur = () => {
        this.setState({focusedAfterError: false});
    };

    update = (event) => {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    };

    showInputTextErrorClass = (className) => (this.state.focusedAfterError ? className : '');

    render() {
        const { placeholder } = this.props;
        const message = nullableToMaybe(this.props.message);

        return (
            <div className="grid">
                <div className={ `row ${message.map(getFormMessageClass).getOrElse('')}` }>
                    <input
                        type="text"
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${message.map(prop('errorLevel')).map(getInputErrorClass).getOrElse('')} ${message.map(prop('errorLevel')).map(getInputTextErrorClass).map(this.showInputTextErrorClass).getOrElse('')}` }
                        onChange={ this.update }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur } />
                </div>
                <div className="row">
                    {message.map(renderErrorMessage).getOrElse('')}
                </div>
            </div>
        );
    }
}

export default TextInput;

export {
    renderErrorMessage
};