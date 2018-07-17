import React from 'react';
import PropTypes from 'prop-types';
import { identity, ifElse } from 'ramda';

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

const renderErrorMessage = ifElse(
    (errState) => !!errState.message,
    (errState) => <span className={ `${errState.messageClass} ${styles.errorStateMessage}` }>{errState.message}</span>,
    () => undefined
);

class TextInput extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        errorMessage: PropTypes.string,
        warningMessage: PropTypes.string,
        infoMessage: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        placeholder: '',
        errorMessage: '',
        warningMessage: '',
        infoMessage: '',
        value: '',
        onChange: identity
    }

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    update = (event) => {
        this.setState({ value: event.target.value });
        this.props.onChange(event);
    }

    render() {
        const { placeholder, errorMessage, warningMessage, infoMessage } = this.props;
        const errorLevelState = getErrorState({ errorMessage, warningMessage, infoMessage });

        return (
            <div className="grid">
                <div className="row">
                    <input
                        type="text"
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${errorLevelState.inputClass}` }
                        onChange={ this.update } />
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