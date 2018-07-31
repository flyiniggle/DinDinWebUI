import TextInput from 'UI/Forms/TextInput/TextInput';
import React from 'react';


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
            passwordRepeatError: undefined
        };
    }

    signUp = () => {

    }

    update = (field, value) => {
        this.setState({
            [field]: value,
            [`${field}Error`]: undefined
        });
    }

    render() {
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
                                message={ this.state.passwordError }
                                value={ this.state.password }
                                onChange={ (e) => this.update('password', e.target.value) }
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                placeholder="Re-enter password"
                                message={ this.state.passwordRepeatError }
                                value={ this.state.passwordRepeat }
                                onChange={ (e) => this.update('passwordRepeat', e.target.value) }
                            />
                        </div>
                        <input className="btn btn-secondary" type="button" value="Sign up!" onClick={ this.signUp } />
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;