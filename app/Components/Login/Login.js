import authenticate from 'Business/Auth/authenticate';
import authStatus from 'Business/Auth/authStatus';
import getFirstInputMessageForField from 'UI/Forms/Validation/getFirstInputMessageForField';
import TextInput from 'UI/Forms/TextInput/TextInput';
import { curry } from 'ramda';
import React from 'react';
import { Redirect } from 'react-router-dom';

import './Login.sass';


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

    redirect = () => {
        this.forceUpdate();
    }

    showErrors = (errors) => {
        const usernameError = getFirstInputMessageForField('username', errors);
        const passwordError = getFirstInputMessageForField('password', errors);

        this.setState({usernameError, passwordError});
    };

    login = async () => {
        const { username, password } = this.state;
        const result = await authenticate(username, password);

        result.match({
            Ok: this.redirect,
            Err: this.showErrors
        });
    };

    render() {
        if (authStatus.loggedIn) {
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
                                onChange={ (e) => this.updateUsername(e.target.value) }
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                placeholder="Password"
                                message={ this.state.passwordError }
                                value={ this.state.password }
                                type="password"
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