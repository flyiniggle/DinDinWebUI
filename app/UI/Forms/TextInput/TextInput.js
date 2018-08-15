import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import getErrorClassForAlert from 'UI/Forms/Validation/getErrorClassForAlert';
import getErrorClassForInput from 'UI/Forms/Validation/getErrorClassForInput';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import React from 'react';
import PropTypes from 'prop-types';
import { Maybe } from 'true-myth';
import { curry, identity, lift, map, pipe, prop } from 'ramda';

import 'UI/Forms/TextInput/TextInput.sass';


const pickErrorLevel = prop('errorLevel');
const getValueOrEmptyString = maybe => maybe.unwrapOr('');


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

// HTMLInputElement => InputMessage => Boolean
const messageIsTallerThanTopSpace = function(input, message) {
    const testSpan = document.createElement('span');

    testSpan.innerHTML = message.message;
    testSpan.style.position = 'absolute';
    testSpan.style.top = '-1000px';
    testSpan.style.width = `${input.offsetWidth}px`;
    document.body.appendChild(testSpan);

    const isTaller = testSpan.offsetHeight > input.getBoundingClientRect().top;

    document.body.removeChild(testSpan);

    return isTaller;
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
    }

    componentDidMount = () => {
        if (this.input.current) {
            this.forceUpdate();
        }
    }

    // (side effects) + HTMLElement => InputMessage => feedbackType
    getFeedbackType = (input, message) => {
        const fbType = this.props.feedbackType;

        if (fbType === 'tooltip' || fbType === 'inline') {
            return fbType;
        }

        return messageIsLongerThanInput(input, message) ? 'tooltip' : 'inline';
    }

    // (side effects) + HTMLElement => InputMessage => feedbackType
    getFeedbackPosition = (input, message) => {
        const fbPosition = this.props.feedbackPosition;

        if (fbPosition !== 'auto') {
            return fbPosition === 'bottom' ? '' : 'top';
        }

        return messageIsTallerThanTopSpace(input, message) ? '' : 'top';
    }

    // InputMessage => feedbackType  => HTMLElement
    getFeedback = (message, feedbackType) => {
        const errorLevelClass = ((feedbackType === 'inline') ? getErrorClassForText : getErrorClassForAlert)(message.errorLevel);
        const typeClass = feedbackType === 'inline' ? '' : 'tooltip alert';

        return <span className={ ` ${errorLevelClass} ${typeClass}` }>{this.props.message.message}</span>;
    }

    update = (event) => {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    };

    render() {
        const { placeholder } = this.props;
        const message = Maybe.of(this.props.message);
        const input = Maybe.of(this.input.current);
        const feedbackType = lift(this.getFeedbackType)(input, message);
        const feedback = lift(this.getFeedback)(message, feedbackType);
        const feedbackPosition = lift(this.getFeedbackPosition)(input, message);

        return (
            <div className="textInput row d-flex flex-column form-group">
                <input
                    ref={ this.input }
                    type={ this.props.type }
                    value={ this.state.value }
                    placeholder={ placeholder }
                    className={ `form-control ${showInputErrorClass(message)} ${showInputTextErrorClass(message)}` }
                    onChange={ this.update } />
                <div className={ `textInputFeedback position-absolute ${feedbackPosition.unwrapOr('')}` }>
                    { feedback.unwrapOr(null) }
                </div>
            </div>
        );
    }
}

export default TextInput;