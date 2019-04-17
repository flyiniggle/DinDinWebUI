import { hot } from 'react-hot-loader/root';
import authStatus from 'Business/Auth/authStatus';
import UserContext from 'Business/Auth/UserContext';
import DinDinService from 'Business/Services/DinDinService';
import DinDinAppBase from 'Components/DinDin/DinDinApp';
import Splash from 'Components/Splash/Splash';
import ProtectedRoute from 'UI/ProtectedRoute';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './DinDin.sass';

class DinDin extends React.Component {

    componentWillMount = () => {
        DinDinService.addNotLoggedInHandler(this.logOut);
    }

    logOut = () => {
        authStatus.logOut();
        this.forceUpdate();
    }

    render() {
        return (
            <UserContext.Provider value={ authStatus.username }>
                <Switch>
                    <ProtectedRoute
                        path="/meals"
                        component={ DinDinAppBase }
                        logoutHandler={ this.logOut }
                    />
                    <Route path="/" component={ Splash } />
                </Switch>
            </UserContext.Provider>
        );
    }
}

export default hot(DinDin);