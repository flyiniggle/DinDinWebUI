import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import getErrorClassForInput from 'UI/Forms/Validation/getErrorClassForInput';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import InlineFeedback from 'UI/Forms/Feedback/InlineFeedback';
import TooltipFeedback from "UI/Forms/Feedback/TooltipFeedback";
import React from 'react';
import PropTypes from 'prop-types';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import { curry, identity, ifElse, map, pipe, prop } from 'ramda';

import 'UI/Forms/TextInput/TextInput.sass';


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

// HTMLInputElement => InputMessage => Boolean
const messageIsLongerThanInput = curry(function(input, message) {
    const testSpan = document.createElement('span');

    testSpan.innerHTML = message.message;
    testSpan.style.position = 'absolute';
    testSpan.style.top = '-500px';
    document.body.appendChild(testSpan);

    return testSpan.offsetWidth > input.current.offsetWidth;
});

// HTMLInputElement => InputMessage => Feedback
function showFeedback(input, message) {
    const getFeedbackComponent = ifElse(
        messageIsLongerThanInput(input),
        props => <TooltipFeedback {...props} />,
        props => <InlineFeedback {...props} />
    );

    return pipe(
        map(getFeedbackComponent),
        getValueOrEmptyString
    )(message);
}

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
        };
        this.input = React.createRef();
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
                        ref={ this.input }
                        type="text"
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${showInputErrorClass(message)} ${showInputTextErrorClass(this.state, message)}` }
                        onChange={ this.update }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur } />
                </div>
                <div className="row">
                    {showFeedback(this.input, message)}
                </div>
            </div>
        );
    }
}

export default TextInput;