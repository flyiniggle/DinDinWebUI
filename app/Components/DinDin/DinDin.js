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
    constructor() {
        super();
        this.state = {
            meals: undefined
        };
    }

    componentWillMount = () => {
        DinDinService.addNotLoggedInHandler(this.logOut);
    }

    setMeals = (meals) => {
        this.setState({meals});
    }

    logOut = () => {
        authStatus.loggedIn = false;
        this.forceUpdate();
    }

    render() {
        return (
            <Switch>
                <ProtectedRoute
                    path="/dashboard"
                    component={ Dashboard }
                    setMeals={ this.setMeals }
                    meals={ this.state.meals } />
                <Route path="/" component={ Splash } />
            </Switch>
        );
    }
}

export default DinDin;