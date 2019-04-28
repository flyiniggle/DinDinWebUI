import { pipe } from 'ramda';
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import reauthenticate from 'Business/Auth/Reauthenticate/reauthenticate';
import Dashboard from 'Components/Dashboard/Dashboard';
import Header from 'Components/Header/Header';
import MealEditor from 'Components/MealEditor/MealEditor';
import MealCreator from 'Components/MealCreator/MealCreator';
import { getMeals } from 'Data/ActionCreators/mealsActionCreators';

import './DinDinApp.sass';


interface IDinDinAppProps {
    logoutHandler: () => void
    getMeals: () => any
}

function DinDinAppBase(props: IDinDinAppProps) {
    React.useEffect(() => {
        props.getMeals();

        const timeout = window.setInterval(reauthenticate, 240000);

        return function () {
            window.clearInterval(timeout)
        }

    }, [props.getMeals]);

    return (
        <div className="mainBackground din-din-app container-fluid">
            <div className="row d-block">
                <div className="col-12">
                    <Header logoutHandler={props.logoutHandler} />
                </div>
            </div>
            <div className="main-container row">
                <Switch>
                    <Route
                        exact
                        path="/meals"
                        render={routeProps => (
                            <Dashboard {...routeProps} />
                        )} />
                    <Route
                        exact
                        path="/meals/new"
                        render={() => (
                            <MealCreator />
                        )} />
                    <Route
                        exact
                        path="/meals/:id"
                        render={routeProps => (
                            <MealEditor mealId={routeProps.match.params.id} />
                        )} />
                </Switch>
            </div>
        </div>
    );
}

const mapStateToProps = function () {
    return {};
};

const mapDispatchToProps = function (dispatch) {
    return {
        getMeals: pipe(getMeals, dispatch)
    };
};

const DinDinApp = connect(mapStateToProps, mapDispatchToProps)(DinDinAppBase);

export default DinDinApp;