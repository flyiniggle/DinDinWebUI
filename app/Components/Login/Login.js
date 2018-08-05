import authenticate from 'Business/Auth/authenticate';
import authStatus from 'Business/Auth/authStatus';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import { construct, curry, head, isNil, pipe, unless } from 'ramda';
import React from 'react';
import { Redirect } from 'react-router-dom';
import getMessagesForField from 'Business/Validation/getMessagesForField';
import TextInput from 'UI/Forms/TextInput/TextInput';

import './Login.sass';


const getPasswordErrors = getMessagesForField('password');
const getUsernameErrors = getMessagesForField('username');
const maybeInputMessage = unless(
    isNil,
    construct(InputMessage)
);
const getInputMessage = pipe(head, maybeInputMessage);

const updateField = curry(function(field, value) {
    this.setState({
        [field]: value,
        [`${field}Error`]: undefined
    });
});

class Login extends React.Component {
    updateUsername = updateField('username');

    updatePassword = updateField('password');

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: undefined,
            passwordError: undefined
        };

        this.updateUsername.bind(this);
        this.updatePassword.bind(this);
    }

    showErrors = (errors) => {
        const usernameError = pipe(getUsernameErrors, getInputMessage)(errors);
        const passwordError = pipe(getPasswordErrors, getInputMessage)(errors);

        this.setState({usernameError, passwordError});
    };

    login = () => {
        const { username, password } = this.state;

        return authenticate(username, password)
            .then(this.forceUpdate, this.showErrors);
    };

    render() {
        if (authStatus.loggedIn) {
            return <Redirect to="/dasbhoard" />;
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
                                feedbackType="tooltip"
                                feedbackPosition="top"
                                onChange={ (e) => this.updateUsername(e.target.value) }
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                placeholder="Password"
                                message={ this.state.passwordError }
                                value={ this.state.password }
                                feedbackPosition="top"
                                onChange={ (e) => this.updatePassword(e.target.value) }
                            />
                        </div>
                        <input className="btn btn-secondary" type="button" value="log in" onClick={ this.login } />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;