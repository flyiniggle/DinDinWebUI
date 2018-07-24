import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import { construct, curry, head, isNil, pipe, unless } from 'ramda';
import React from 'react';
import AuthService from 'Business/Auth/Service';
import getMessagesForField from 'Business/Validation/getMessagesForField';
import TextInput from 'UI/Forms/TextInput/TextInput';

import check from './validate';

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

    login = () => {
        const errors = check(this.state);
        if (errors.length === 0) {
            AuthService.get(this.state.username, this.state.password)
                .then(console.log);
        } else {
            const usernameError = pipe(getUsernameErrors, getInputMessage)(errors);
            const passwordError = pipe(getPasswordErrors, getInputMessage)(errors);

            this.setState({usernameError, passwordError});
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>username</label>
                    <TextInput
                        placeholder="Username"
                        message={ this.state.usernameError }
                        value={ this.state.username }
                        onChange={ (e) => this.updateUsername(e.target.value) }
                    />
                    <label>password</label>
                    <TextInput
                        placeholder="Password"
                        message={ this.state.passwordError }
                        value={ this.state.password }
                        onChange={ (e) => this.updatePassword(e.target.value) }
                    />
                    <input className="btn btn-primary" type="button" value="log in" onClick={ this.login } />
                </div>
            </form>
        );
    }
}

export default Login;