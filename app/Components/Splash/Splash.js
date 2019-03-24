import SignUp from 'Components/SignUp/SignUp';
import React from 'react';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import { Link, Switch, Route } from 'react-router-dom';
import Login from 'Components/Login/Login';

import logo from './Assets/splash-logo-temp.svg';
import './Splash.sass';


function Splash() {
    return (
        <div className="background">
            <div className="container-fluid">
                <div className="splash">
                    <div className="row splash-header d-flex flex-row-reverse">
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
                                <div className="row d-flex justify-content-center align-items-center">
                                    <MobileScreen className="w-75">
                                        <img src={ logo } alt="logo" className="mt-5 w-100" />
                                    </MobileScreen>
                                    <DesktopScreen className="w-25">
                                        <img src={ logo } alt="logo" className="mt-5 w-100" />
                                    </DesktopScreen>
                                </div>
                            ) } />

                        <Route path="/login" component={ Login } />

                        <Route path="/signup" component={ SignUp } />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Splash;