import React from 'react';
import AuthService from 'Business/Auth/Service';
import TextInput from 'UI/Forms/TextInput/TextInput';


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
        AuthService.get(this.state.username, this.state.password)
            .then(data => data.JSON())
            .then(console.log);
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label>username</label>
                    <TextInput
                        placeholder="Username"
                        onChange={ (e) => this.setState({ username: e.target.value }) }
                    />
                    <label>password</label>
                    <input
                        type="text"
                        onChange={ (e) => this.setState({ password: e.target.value }) }
                        className="form-control" />
                    <input type="button" onClick={ this.login } />
                </div>
            </form>
        );
    }
}

export default Login;