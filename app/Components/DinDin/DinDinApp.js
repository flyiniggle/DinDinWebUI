import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from 'Components/Dashboard/Dashboard';
import Meal from 'Components/Meal/Meal';
import Header from 'Components/Header/Header';

function DinDinApp(props) {
    return (
        <div className="mainBackground container-fluid dashboard d-flex flex-column">
            <div className="row d-block">
                <div className="col-12">
                    <Header logoutHandler={ props.logoutHandler } />
                </div>
            </div>
            <Switch>
                <Route
                    exact
                    path="/meals"
                    render={ routeProps => (
                        <Dashboard
                            { ...routeProps }
                            meals={ props.meals }
                            useMeal={ props.useMeal } />
                    ) } />
                <Route
                    exact
                    path="/meals/:id"
                    render={ routeProps => (
                        <Meal
                            { ...routeProps }
                            meals={ props.meals }
                            useMeal={ props.useMeal }
                            updateMeal={ props.updateMeal } />
                    ) } />
            </Switch>
        </div>
    );
}

DinDinApp.defaultPropTypes = {
    meals: undefined,
    useMeal: () => undefined,
    logoutHandler: () => undefined
};

DinDinApp.propTypes = {
    meals: PropTypes.array,
    useMeal: PropTypes.func,
    logoutHandler: PropTypes.func,
    updateMeal: PropTypes.func.isRequired
};

export default DinDinApp;