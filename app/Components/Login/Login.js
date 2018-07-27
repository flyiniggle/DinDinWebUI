import authenticate from 'Business/Auth/authenticate';
import InputMessage from 'UI/Forms/Validation/InputMessage';
import { construct, curry, head, isNil, pipe, unless } from 'ramda';
import React from 'react';
import getMessagesForField from 'Business/Validation/getMessagesForField';
import TextInput from 'UI/Forms/TextInput/TextInput';


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

    redirect = () => console.log('success!');

    showErrors = (errors) => {
        const usernameError = pipe(getUsernameErrors, getInputMessage)(errors);
        const passwordError = pipe(getPasswordErrors, getInputMessage)(errors);

        this.setState({usernameError, passwordError});
    };

    login = () => {
        const { username, password } = this.state;

        return authenticate(username, password)
            .then(this.redirect, this.showErrors);
    };

    render() {
        return (
            <div className="row justify-content-center">
                <form className="d-flex col-lg-4 col-md-6 col-sm-8">
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
            </div>
        );
    }
}

export default Login;