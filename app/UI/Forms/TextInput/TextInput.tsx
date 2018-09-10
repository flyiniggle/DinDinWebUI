import getErrorClassForAlert from 'UI/Forms/Validation/getErrorClassForAlert';
import getErrorClassForInput from 'UI/Forms/Validation/getErrorClassForInput';
import getErrorClassForText from 'UI/Forms/Validation/getErrorClassForText';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import * as React from 'react';
import { Maybe } from 'true-myth';
import { curry, identity, lift, map, pipe, prop } from 'ramda';

import 'UI/Forms/TextInput/TextInput.sass';


const pickErrorLevel = prop('errorLevel');
const getValueOrEmptyString = maybe => maybe.unwrapOr('');


type TShowInputErrorClass = (Maybe) => string
const showInputErrorClass: TShowInputErrorClass = pipe(
    map(pickErrorLevel),
    map(getErrorClassForInput),
    getValueOrEmptyString
);

const showInputTextErrorClass: (TextInputState) => Maybe<string> = pipe(
    map(pickErrorLevel),
    map(getErrorClassForText),
    getValueOrEmptyString
);

const messageIsLongerThanInput = curry(function (input: HTMLInputElement, message: InputMessage): boolean {
    const testSpan = document.createElement('span');

    testSpan.innerHTML = message.message;
    testSpan.style.position = 'absolute';
    testSpan.style.top = '-500px';
    document.body.appendChild(testSpan);

    const isLonger = testSpan.offsetWidth > input.offsetWidth;

    document.body.removeChild(testSpan);

    return isLonger;
});

const messageIsTallerThanTopSpace = function (input: HTMLInputElement, message: InputMessage): boolean {
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

interface TextInputProps {
    placeholder?: string;
    message?: InputMessage;
    type?: string;
    value: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    feedbackType?: 'inline' | 'tooltip' | 'auto';
    feedbackPosition?: 'top' | 'bottom' | 'auto';
}

interface TextInputState {
    value: string
}

class TextInput extends React.Component<TextInputProps, TextInputState> {

    static defaultProps = {
        placeholder: '',
        message: undefined,
        type: 'text',
        value: '',
        onChange: identity,
        feedbackType: 'auto',
        feedbackPosition: 'auto'
    };

    private input = React.createRef<HTMLInputElement>();

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };
    }

    componentDidMount = () => {
        if (this.input.current) {
            this.forceUpdate();
        }
    }

    getFeedbackType = (input: HTMLInputElement, message: InputMessage): string => {
        const fbType = this.props.feedbackType;

        if (fbType === 'tooltip' || fbType === 'inline') {
            return fbType;
        }

        return messageIsLongerThanInput(input, message) ? 'tooltip' : 'inline';
    }

    getFeedbackPosition = (input: HTMLInputElement, message: InputMessage): string => {
        const fbPosition = this.props.feedbackPosition;

        if (fbPosition !== 'auto') {
            return fbPosition === 'bottom' ? '' : 'top';
        }

        return messageIsTallerThanTopSpace(input, message) ? '' : 'top';
    }

    getFeedback = (message: InputMessage, feedbackType: string): JSX.Element => {
        const errorLevelClass = ((feedbackType === 'inline') ? getErrorClassForText : getErrorClassForAlert)(message.errorLevel);
        const typeClass = feedbackType === 'inline' ? '' : 'tooltip alert';

        return <span className={` ${errorLevelClass} ${typeClass}`}>{this.props.message.message}</span>;
    }

    update = (event) => {
        this.setState({ value: event.target.value });
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
            <div className="textInput row d-flex flex-column">
                <input
                    ref={this.input}
                    type={this.props.type}
                    value={this.state.value}
                    placeholder={placeholder}
                    className={`form-control ${showInputErrorClass(message)} ${showInputTextErrorClass(message)}`}
                    onChange={this.update} />
                <div className={`textInputFeedback position-absolute ${feedbackPosition.unwrapOr('')}`}>
                    {feedback.unwrapOr(null)}
                </div>
            </div>
        );
    }
}

export default TextInput;