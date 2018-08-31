import MealsService from 'Business/Meals/Service';
import MealCard from 'Components/Dashboard/MealCard/MealCard';
import Overview from 'DinDin/Components/Dashboard/Overview/Overview';
import Header from 'DinDin/Components/Header/Header';
import React from 'react';
import PropTypes from 'prop-types';
import { Result } from 'true-myth';

import 'Styles/theme.sass';
import './Dashboard.sass';


class Dashboard extends React.Component {
    static defaultPropTypes = {
        meals: undefined,
        setMeals: () => undefined,
        useMeal: () => undefined,
        logoutHandler: () => undefined
    }

    static propTypes = {
        meals: PropTypes.array,
        setMeals: PropTypes.func,
        useMeal: PropTypes.func,
        logoutHandler: PropTypes.func
    }

    componentDidMount = () => {
        if (!this.props.meals) {
            MealsService.get()
                .then(Result.unwrapOr([]))
                .then(this.props.setMeals);
        }
    }

    render() {
        return (
            <div className="mainBackground container-fluid dashboard">
                <div className="row">
                    <div className="col-12">
                        <Header logoutHandler={ this.props.logoutHandler } />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        filters
                    </div>
                </div>
                <div className="main-container row d-flex flex-row-reverse justify-content-between">
                    <div className="meal-card-container col-xs-12 col-md-8 p-5">
                        {this.props.meals && this.props.meals.map((meal) => <MealCard meal={ meal } useMeal={ this.props.useMeal } key={ meal.id } />)}
                    </div>
                    <div className="col-xs-12 col-md-4 position-fixed">
                        <Overview meals={ this.props.meals } />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;