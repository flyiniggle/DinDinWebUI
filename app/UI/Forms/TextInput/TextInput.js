import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import getErrorClassForInput from 'UI/Forms/Validation/getErrorClassForInput';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import InlineFeedback from 'UI/Forms/Feedback/InlineFeedback';
import TooltipFeedback from 'UI/Forms/Feedback/TooltipFeedback';
import React from 'react';
import PropTypes from 'prop-types';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import { curry, identity, map, pipe, prop } from 'ramda';

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
        type: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        feedbackType: PropTypes.oneOf(['inline', 'tooltip', 'auto']),
        feedbackPosition: PropTypes.oneOf(['top', 'bottom', 'auto'])
    };

    static defaultProps = {
        placeholder: '',
        message: undefined,
        type: 'text',
        value: '',
        onChange: identity,
        feedbackType: 'auto',
        feedbackPosition: 'auto'
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            focusedAfterError: false
        };
        this.input = React.createRef();
        this.feedback = React.createRef();
    }

    componentDidMount = () => {
        if (this.input.current) {
            this.forceUpdate();
        }
    }

    componentDidUpdate = () => {
        const message = this.props.message;

        if (message) {
            this.positionFeedback();
        }
    }

    onFocus = () => {
        if (this.props.message) {
            this.setState({focusedAfterError: true});
        }
    };

    onBlur = () => {
        this.setState({focusedAfterError: false});
    };

    // (side effects) + InputMessage => feedbackType
    getFeedbackType = (message) => {
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

    // (side effects) + feedbackType  => Feedback
    getFeedback = (feedbackType) => {
        let feedback;

        if (feedbackType === 'inline') {
            feedback = <InlineFeedback { ...this.props.message } />;
        } else if (feedbackType === 'tooltip') {
            feedback = <TooltipFeedback { ...this.props.message } active={ this.input.current === document.activeElement } />;
        }

        return feedback;
    }

    update = (event) => {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    };

    positionFeedback = () => {
        const PADDING = 5;
        const positionSetting = this.props.feedbackPosition;
        const messageHeight = this.feedback.current.offsetHeight;
        const inputHeight = this.input.current.offsetHeight;
        const inputPosition = this.input.current.offsetTop;
        const inputDistanceFromBottomOfScreen = window.innerHeight - (inputPosition + inputHeight);

        if (positionSetting === 'top'
            || (positionSetting === 'auto' && (inputDistanceFromBottomOfScreen < (messageHeight + PADDING)))) {
            // show feedback above input if 1.) feedbackPosition is set to top or 2.) feedbackPosition is set to auto and the input is very close to the bottom of the screen
            this.feedback.current.style.top = `${inputPosition - (messageHeight + PADDING)}px`;
        } else {
            this.feedback.current.style.top = `${inputPosition + inputHeight + PADDING}px`;
        }
    }

    render() {
        const { placeholder } = this.props;
        const message = nullableToMaybe(this.props.message);

        return (
            <div className="row d-flex flex-column form-group">
                <div>
                    <input
                        ref={ this.input }
                        type={ this.props.type }
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${showInputErrorClass(message)} ${showInputTextErrorClass(this.state, message)}` }
                        onChange={ this.update }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur } />
                </div>
                <div className="textInputFeedback position-absolute" ref={ this.feedback }>
                    {message
                        .map(this.getFeedbackType)
                        .map(this.getFeedback)
                        .getOrElse(null)}
                </div>
            </div>
        );
    }
}

export default TextInput;