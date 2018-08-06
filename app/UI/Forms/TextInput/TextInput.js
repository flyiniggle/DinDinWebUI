import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import getErrorClassForInput from 'UI/Forms/Validation/getErrorClassForInput';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import InlineFeedback from 'UI/Forms/Feedback/InlineFeedback';
import TooltipFeedback from 'UI/Forms/Feedback/TooltipFeedback';
import React from 'react';
import PropTypes from 'prop-types';
import nullableToMaybe from 'folktale/conversions/nullable-to-maybe';
import { curry, identity, lift, map, pipe, prop } from 'ramda';

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
const showInputTextErrorClass = pipe(
    map(pickErrorLevel),
    map(getErrorClassForText),
    getValueOrEmptyString
);

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
            value: props.value
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
        if (this.props.message) {
            this.positionFeedback();
        }
    }

    // (side effects) + HTMLElement => InputMessage => feedbackType
    getFeedbackType = (message, input) => {
        const fbType = this.props.feedbackType;

        if (fbType === 'tooltip' || fbType === 'inline') {
            return fbType;
        }

        return messageIsLongerThanInput(input, message) ? 'tooltip' : 'inline';
    }

    // (side effects) + feedbackType  => Feedback
    getFeedback = (feedbackType) => (
        (feedbackType === 'inline')
            ? <InlineFeedback { ...this.props.message } />
            : <TooltipFeedback { ...this.props.message } active={ this.input.current === document.activeElement } />
    )

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
        const input = nullableToMaybe(this.input.current);
        const feedbackType = lift(this.getFeedbackType)(input, message);

        return (
            <div className="row d-flex flex-column form-group">
                <div>
                    <input
                        ref={ this.input }
                        type={ this.props.type }
                        value={ this.state.value }
                        placeholder={ placeholder }
                        className={ `form-control ${showInputErrorClass(message)} ${showInputTextErrorClass(message)}` }
                        onChange={ this.update }
                        onFocus={ this.onFocus }
                        onBlur={ this.onBlur } />
                </div>
                <div className="textInputFeedback position-absolute" ref={ this.feedback }>
                    {feedbackType.map(this.getFeedback).getOrElse(null)}
                </div>
            </div>
        );
    }
}

export default TextInput;