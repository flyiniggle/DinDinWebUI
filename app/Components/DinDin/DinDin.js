import authStatus from 'Business/Auth/authStatus';
import DinDinService from 'Business/Services/DinDinService';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'Components/Dashboard/Dashboard';
import Splash from 'Components/Splash/Splash';
import ProtectedRoute from 'UI/ProtectedRoute';

import 'Styles/core.sass';
import './DinDin.sass';

class DinDin extends React.Component {
    componentWillMount = () => {
        DinDinService.addNotLoggedInHandler(this.logOut);
    }

    logOut = () => {
        authStatus.loggedIn = false;
        console.log(this)
        this.forceUpdate();
    }

    render() {
        return (
            <div className="background">
                <div className="container-fluid">
                    <Switch>
                        <ProtectedRoute path="/dashboard" component={ Dashboard } />
                        <Route path="/" component={ Splash } />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default DinDin;