import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMealById from 'Business/Meals/getMealById';
import Dashboard from 'Components/Dashboard/Dashboard';
import Header from 'Components/Header/Header';
import MealEditor from 'Components/MealEditor/MealEditor';
import MealCreator from 'Components/MealCreator/MealCreator';

import './DinDinApp.sass';


class DinDinApp extends React.Component {
    componentWillMount = () => {
        this.props.getMeals();
    }

    render() {
        const props = this.props;
        const maybeMeals = props.meals ? props.meals : [];

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
                                <Dashboard
                                    { ...routeProps }
                                    meals={ maybeMeals }
                                    useMeal={ props.useMeal } />
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
                                <MealEditor
                                    meal={ getMealById(routeProps.match.params.id, maybeMeals) }
                                    useMeal={ props.useMeal }
                                    updateMeal={ props.updateMeal } />
                            ) } />
                    </Switch>
                </div>
            </div>
        );
    }
}

DinDinApp.defaultPropTypes = {
    meals: undefined,
    useMeal: () => undefined,
    logoutHandler: () => undefined
};

DinDinApp.propTypes = {
    meals: PropTypes.array,
    getMeals: PropTypes.func,
    useMeal: PropTypes.func,
    logoutHandler: PropTypes.func,
    updateMeal: PropTypes.func.isRequired
};

export default DinDinApp;