import authStatus from 'Business/Auth/authStatus';
import UserContext from 'Business/Auth/UserContext';
import DinDinService from 'Business/Services/DinDinService';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'Components/Dashboard/Dashboard';
import Splash from 'Components/Splash/Splash';
import Meal from 'Components/Meal/Meal';
import ProtectedRoute from 'UI/ProtectedRoute';

import './DinDin.sass';

class DinDin extends React.Component {
    constructor() {
        super();
        this.state = {
            meals: null
        };
    }

    componentWillMount = () => {
        DinDinService.addNotLoggedInHandler(this.logOut);
    }

    setMeals = (meals) => {
        this.setState({ meals });
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
                        path="/dashboard"
                        component={ Dashboard }
                        setMeals={ this.setMeals }
                        logoutHandler={ this.logOut }
                        meals={ this.state.meals } />
                    <ProtectedRoute
                        path="/meals/:id"
                        component={ Meal }
                        meals={ this.state.meals }
                        logoutHandler={ this.logOut }
                    />
                    <Route path="/" component={ Splash } />
                </Switch>
            </UserContext.Provider>
        );
    }
}

export default DinDin;