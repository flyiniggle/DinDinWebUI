import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import React from 'react';
import PropTypes from 'prop-types';
import { identity, ifElse } from 'ramda';

import './TextInput.sass';


function getErrorState(props = {}) {
    const message = props.message || '';
    const errorLevel = props.errorLevel || ErrorLevel.ok;

    let inputClass;
    let messageClass;
    let inputTextClass;
    let formClass;

    if (errorLevel === ErrorLevel.error) {
        messageClass = 'errorMessage';
        inputTextClass = 'errorInputText';
        inputClass = 'is-invalid';
        formClass = 'has-danger';
    } else if (errorLevel === ErrorLevel.warning) {
        messageClass = 'warningMessage';
        inputTextClass = 'warningInputText';
        inputClass = 'is-invalid';
        formClass = 'has-warning';
    } else if (errorLevel === ErrorLevel.info) {
        messageClass = 'infoMessage';
        inputTextClass = 'infoInputText';
        inputClass = 'is-invalid';
        formClass = 'has-info';
    } else {
        messageClass = '';
        inputTextClass = '';
        inputClass = '';
        formClass = '';
    }

    return {
        message,
        inputClass,
        inputTextClass,
        messageClass,
        formClass
    };
}

const renderErrorMessage = ifElse(
    (errState) => !!errState.message,
    (errState) => <span className={ `${errState.messageClass} ${'errorStateMessage'}` }>{errState.message}</span>,
    () => undefined
);

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
        message: {},
        value: '',
        onChange: identity
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            focusedAfterError: false
            //changedAfterEror: true
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

    showInputErrorClass = () => !!this.props.message.message;

    showInputTextErrorClass = () => this.showInputErrorClass() && !this.state.focusedAfterError;

    render() {
        const { placeholder } = this.props;
        const errorLevelState = getErrorState(this.props.message);

        return (
            <div className="grid">
                <div className={ `row ${errorLevelState.formClass}` }>
                    <input
                        type="text"
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${this.showInputErrorClass() ? errorLevelState.inputClass : ''} ${this.showInputTextErrorClass() ? errorLevelState.inputTextClass : ''}` }
                        onChange={ this.update }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur } />
                </div>
                <div className="row">
                    {renderErrorMessage(errorLevelState)}
                </div>
            </div>
        );
    }
}

export default TextInput;

export {
    getErrorState,
    renderErrorMessage
};