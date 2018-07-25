import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForText from 'DinDin/UI/Forms/Validation/getErrorClassForText';
import getErrorClassForInput from 'DinDin/UI/Forms/Validation/getErrorClassForInput';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import Feedback from 'DinDin/UI/Forms/Feedback/Feedback';
import React from 'react';
import PropTypes from 'prop-types';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import { identity, map, pipe, prop } from 'ramda';

import './TextInput.sass';


const pickErrorLevel = prop('errorLevel');
const getValueOrEmptyString = maybe => maybe.getOrElse('');


// Maybe => String
const showInputErrorClass = pipe(
    map(pickErrorLevel),
    map(getErrorClassForInput),
    getValueOrEmptyString
);

// state => Maybe => String
const showInputTextErrorClass = function(state, message) {
    return pipe(
        map(pickErrorLevel),
        map(getErrorClassForText),
        map((className) => (state.focusedAfterError ? '' : className)),
        getValueOrEmptyString
    )(message);
};

// InputMessage => Feedback
const showFeedback = pipe(
    map((props) => <Feedback { ...props } />),
    getValueOrEmptyString
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
        if (this.props.message) {
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

    render() {
        const { placeholder } = this.props;
        const message = nullableToMaybe(this.props.message);

        return (
            <div className="grid">
                <div className="row form-group">
                    <input
                        type="text"
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${showInputErrorClass(message)} ${showInputTextErrorClass(this.state, message)}` }
                        onChange={ this.update }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur } />
                </div>
                <div className="row">
                    {showFeedback(message)}
                </div>
            </div>
        );
    }
}

export default TextInput;