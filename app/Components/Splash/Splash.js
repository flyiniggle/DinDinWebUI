import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from 'Components/Login/Login';

import logo from './Assets/splash-logo-temp.svg';
import './Splash.sass';


function Splash() {
    return (
        <div className="splash">
            <div className="row header d-flex flex-row-reverse">
                <div className="btn-group" role="group">
                    <Link to="/login" className="btn btn-secondary">
                        Log in
                    </Link>
                    <Link to="/signup" className="btn btn-secondary">
                        Sign up!
                    </Link>
                </div>
            </div>
            <Switch>
                <Route exact
                    path="/"
                    render={ () => (
                        <div className="row d-flex justify-content-center">
                            <img width="400" height="400" src={ logo } alt="logo" className="mt-5" />
                        </div>
                    ) } />

                <Route path="/login" component={ Login } />

                <Route path="/signup"
                    render={ () => (
                        <span>Sign up!</span>
                    ) } />
            </Switch>
        </div>
    );
}

export default Splash;