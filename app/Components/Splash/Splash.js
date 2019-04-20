import SignUp from 'Components/SignUp/SignUp';
import React from 'react';
import { PhoneScreen, TabletScreen, DesktopScreen } from 'react-responsive-redux';
import { Link, Switch, Route } from 'react-router-dom';
import Login from 'Components/Login/Login';

import SplashIcon from './SplashIcon';

import './Splash.sass';


function Splash() {
    return (
        <div className="background overflow-hidden">
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
                                <div className="row d-flex justify-content-center p-5">
                                    <PhoneScreen className="d-flex logo-direction align-items-center">
                                        <SplashIcon
                                            width={ 150 }
                                            height={ 150 }
                                            className="splash-icon" />
                                        <h1 className="splash-title phone">DinDin</h1>
                                    </PhoneScreen>
                                    <TabletScreen className="d-flex logo-direction align-items-center">
                                        <SplashIcon
                                            width={ 175 }
                                            height={ 175 }
                                            className="splash-icon" />
                                        <h1 className="splash-title tablet">DinDin</h1>
                                    </TabletScreen>
                                    <DesktopScreen className="d-flex flex-column align-items-center">
                                        <SplashIcon
                                            width={ 250 }
                                            height={ 250 }
                                            className="splash-icon" />
                                        <h1 className="splash-title desktop">DinDin</h1>
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