import authenticate from 'Business/Auth/authenticate';
import authStatus from 'Business/Auth/authStatus';
import TextInput from 'UI/Forms/TextInput/TextInput';
import React from 'react';
import { pick } from 'ramda';
import signup from 'Business/Signup/signup';
import getFirstInputMessageForField from 'UI/Forms/Validation/getFirstInputMessageForField';
import { Redirect } from 'react-router-dom';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';


class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            username: undefined,
            email: undefined,
            password: undefined,
            passwordRepeat: undefined,
            usernameError: undefined,
            emailError: undefined,
            passwordError: undefined,
            passwordRepeatError: undefined,
            sendingRequest: false
        };
    }

    componentWillMount = function() {
        document.addEventListener('keydown', this.handleKeydown, false);
    }


    componentWillUnmount = function() {
        document.removeEventListener('keydown', this.handleKeydown, false);
    }

    signUp = async () => {
        this.setState({ sendingRequest: true });
        const input = pick(['username', 'email', 'password', 'passwordRepeat'], this.state);

        const result = await signup(input);

        if (result.isErr()) {
            this.setState({ sendingRequest: false });
        }
        result.match({
            Ok: this.login,
            Err: this.showErrors
        });
    }

    update = (field, value) => {
        this.setState({
            [field]: value,
            [`${field}Error`]: undefined
        });
    }

    login = async () => {
        const { username, password } = this.state;
        const result = await authenticate(username, password);

        this.setState({ sendingRequest: false }, function() {
            result.match({
                Ok: this.redirect,
                Err: this.showErrors
            });
        });
    };

    handleKeydown = (e) => {
        if (e.key === 'Enter') {
            this.signUp(e);
        }
    }

    redirect = () => {
        this.forceUpdate();
    }

    showErrors = (errors) => {
        const usernameError = getFirstInputMessageForField('username', errors);
        const emailError = getFirstInputMessageForField('email', errors);
        const passwordError = getFirstInputMessageForField('password', errors);
        const passwordRepeatError = getFirstInputMessageForField('passwordRepeat', errors);

        this.setState({
            usernameError,
            emailError,
            passwordError,
            passwordRepeatError
        });
    }

    render() {
        if (authStatus.authToken) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="row d-flex justify-content-center">
                <form className="login col-xl-3 col-lg-4 col-md-6 col-8 p-5">
                    <div className="form-group row d-flex flex-column">
                        <div className="mb-4">
                            <TextInput
                                placeholder="Username"
                                message={ this.state.usernameError }
                                value={ this.state.username }
                                onChange={ (e) => this.update('username', e.target.value) }
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                placeholder="Email"
                                message={ this.state.emailError }
                                value={ this.state.email }
                                onChange={ (e) => this.update('email', e.target.value) }
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                placeholder="Password"
                                type="password"
                                message={ this.state.passwordError }
                                value={ this.state.password }
                                onChange={ (e) => this.update('password', e.target.value) }
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                placeholder="Re-enter password"
                                type="password"
                                message={ this.state.passwordRepeatError }
                                value={ this.state.passwordRepeat }
                                onChange={ (e) => this.update('passwordRepeat', e.target.value) }
                            />
                        </div>
                        <AsyncButton className="btn btn-secondary" onClick={ this.signUp } working={ this.state.sendingRequest }>Sign Up!</AsyncButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;