import authStatus from 'Business/Auth/authStatus';
import UserContext from 'Business/Auth/UserContext';
import useMeal from 'Business/Meals/useMeal';
import DinDinService from 'Business/Services/DinDinService';
import DinDinApp from 'Components/DinDin/DinDinApp';
import Splash from 'Components/Splash/Splash';
import ProtectedRoute from 'UI/ProtectedRoute';
import { eqProps, map, mergeDeepLeft, when } from 'ramda';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './DinDin.sass';

class DinDin extends React.Component {
    constructor(props) {
        super(props);
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

    updateMeal = (meal) => {
        const isMatchingMeal = eqProps('id', meal);
        const replaceMatchingMeal = when(isMatchingMeal, mergeDeepLeft(meal));

        if (this.state.meals) {
            const meals = map(replaceMatchingMeal, this.state.meals);

            this.setMeals(meals);
        }
    }

    useMeal = (meal) => useMeal(meal).then(map(this.updateMeal));

    logOut = () => {
        authStatus.logOut();
        this.setMeals();
    }

    render() {
        return (
            <UserContext.Provider value={ authStatus.username }>
                <Switch>
                    <ProtectedRoute
                        path="/meals"
                        component={ DinDinApp }
                        logoutHandler={ this.logOut }
                        useMeal={ this.useMeal }
                        updateMeal={ this.updateMeal }
                    />
                    <Route path="/" component={ Splash } />
                </Switch>
            </UserContext.Provider>
        );
    }
}

export default DinDin;