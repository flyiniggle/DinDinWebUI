import { head, pipe, prop } from 'ramda';
import React from 'react';
import AuthService from 'Business/Auth/Service';
import getMessagesForField from 'Business/Validation/getMessagesForField';
import TextInput from 'UI/Forms/TextInput/TextInput';

import check from './validate';

const getPasswordErrors = getMessagesForField('password');
const getUsernameErrors = getMessagesForField('username');
const getErrorMessage = pipe(head, prop('message'));

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: ''
        };
    }

    login = () => {
        const errors = check(this.state);
        if (errors.length === 0) {
            AuthService.get(this.state.username, this.state.password)
                .then(data => data.JSON())
                .then(console.log);
        } else {
            const usernameError = pipe(getUsernameErrors, getErrorMessage)(errors);
            const passwordError = pipe(getPasswordErrors, getErrorMessage)(errors);

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
                        errorMessage={ this.state.usernameError }
                        value={ this.state.username }
                        onChange={ (e) => this.setState({ username: e.target.value }) }
                    />
                    <label>password</label>
                    <TextInput
                        placeholder="Password"
                        errorMessage={ this.state.passwordError }
                        value={ this.state.password }
                        onChange={ (e) => this.setState({ password: e.target.value}) }
                    />
                    <input type="button" onClick={ this.login } />
                </div>
            </form>
        );
    }
}

export default Login;