import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import getErrorClassForInput from 'UI/Forms/Validation/getErrorClassForInput';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import InlineFeedback from 'UI/Forms/Feedback/InlineFeedback';
import TooltipFeedback from 'UI/Forms/Feedback/TooltipFeedback';
import React from 'react';
import PropTypes from 'prop-types';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import Maybe from 'folktale/maybe';
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

    const isLonger = testSpan.offsetWidth > input.offsetWidth;

    document.body.removeChild(testSpan);

    return isLonger;
});

// InputMessage => feedbackType => Feedback
const getFeedback = curry(function(message, active, feedbackType) {
    let feedback;

    if (feedbackType === 'inline') {
        feedback = <InlineFeedback { ...message } />;
    } else if (feedbackType === 'tooltip') {
        feedback = <TooltipFeedback { ...message } active={ active } />;
    }

    return feedback;
});

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
        onChange: PropTypes.func,
        feedbackType: PropTypes.oneOf(['inline', 'tooltip', 'auto']),
        feedbackPosition: PropTypes.oneOf(['top', 'bottom', 'auto']),
        tabIndex: PropTypes.number //mostly for testing purposes: JSDom requires a tabIndex to set document.activeElement correctly.
    };

    static defaultProps = {
        placeholder: '',
        message: undefined,
        value: '',
        onChange: identity,
        feedbackType: 'auto',
        feedbackPosition: 'auto',
        tabIndex: undefined
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            focusedAfterError: false
        };
        this.input = React.createRef();
    }

    componentDidMount = () => {
        if (this.input.current) {
            this.forceUpdate();
        }
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

    checkFeedback = (message) => {
        let calculatedFeedbackType;

        switch (this.props.feedbackType) {
        case 'tooltip':
            calculatedFeedbackType = 'tooltip';
            break;
        case 'inline':
            calculatedFeedbackType = 'inline';
            break;
        case 'auto':
        default:
            calculatedFeedbackType = messageIsLongerThanInput(this.input.current, message) ? 'tooltip' : 'inline';
        }

        return calculatedFeedbackType;
    }

    render() {
        const { placeholder } = this.props;
        const message = nullableToMaybe(this.props.message);
        const inputIsFocused = this.input.current === document.activeElement;

        return (
            <div>
                <div className="row d-flex flex-column form-group">
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
                <div className="textInputFeedback row position-absolute">
                    {message.map(this.checkFeedback)
                        .map(getFeedback(this.props.message, inputIsFocused))
                        .getOrElse(null)}
                </div>
            </div>
        );
    }
}

export default TextInput;