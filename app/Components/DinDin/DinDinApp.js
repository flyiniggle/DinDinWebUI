
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from 'Components/Dashboard/Dashboard';
import Header from 'Components/Header/Header';
import MealEditor from 'Components/MealEditor/MealEditor';
import MealCreator from 'Components/MealCreator/MealCreator';

import './DinDinApp.sass';


function DinDinApp(props) {

    return (
        <div className="mainBackground din-din-app container-fluid dashboard d-flex flex-column">
            <div className="row d-block">
                <div className="col-12">
                    <Header logoutHandler={ props.logoutHandler } />
                </div>
            </div>
            <div className="main-container row flex-grow-1">
                <Switch>
                    <Route
                        exact
                        path="/meals"
                        render={ routeProps => (
                            <Dashboard { ...routeProps } />
                        ) } />
                    <Route
                        exact
                        path="/meals/new"
                        render={ () => (
                            <MealCreator />
                        ) } />
                    <Route
                        exact
                        path="/meals/:id"
                        render={ routeProps => (
                            <MealEditor mealId={ routeProps.match.params.id } />
                        ) } />
                </Switch>
            </div>
        </div>
    );
}

DinDinApp.defaultPropTypes = {
    logoutHandler: () => undefined
};

DinDinApp.propTypes = {
    logoutHandler: PropTypes.func
};

export default DinDinApp;