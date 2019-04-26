import { pipe } from 'ramda';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import reauthenticate from 'Business/Auth/Reauthenticate/reauthenticate';
import Dashboard from 'Components/Dashboard/Dashboard';
import Header from 'Components/Header/Header';
import MealEditor from 'Components/MealEditor/MealEditor';
import MealCreator from 'Components/MealCreator/MealCreator';
import { getMeals } from 'Data/ActionCreators/mealsActionCreators';

import './DinDinApp.sass';


class DinDinAppBase extends React.Component {
    static defaultPropTypes = {
        logoutHandler: () => undefined
    };

    timeout = null;

    static propTypes = {
        logoutHandler: PropTypes.func,
        getMeals: PropTypes.func.isRequired
    };

    componentWillMount = () => {
        this.props.getMeals();
        this.timeout = window.setInterval(reauthenticate, 240000);
    };

    componentWillUnmount = () => {
        window.clearInterval(this.timeout);
    }

    render() {
        return (
            <div className="mainBackground din-din-app container-fluid dashboard d-flex flex-column">
                <div className="row d-block">
                    <div className="col-12">
                        <Header logoutHandler={this.props.logoutHandler} />
                    </div>
                </div>
                <div className="main-container row flex-grow-1">
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