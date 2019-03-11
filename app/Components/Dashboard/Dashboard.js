import { pipe } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Ribbon from 'Components/Ribbon/Ribbon';
import MealCard from 'Components/Dashboard/MealCard/MealCard';
import OverviewBase from 'Components/Dashboard/Overview/Overview';
import { useMeal } from 'Data/ActionCreators/dashboardActionCreators';
import { meals, isLoading as isMealsLoading, isWorking as isMealsWorking } from 'Data/Selectors/mealsSelectors';
import { isLoading as isDashbordLoading, messages as dashboardMessages } from 'Data/Selectors/dashboardSelectors';

import 'Styles/theme.sass';
import './Dashboard.sass';


class DashboardBase extends React.Component {
    static defaultPropTypes = {
        meals: undefined,
        logoutHandler: () => undefined,
        getMeals: () => undefined,
        useMeal: () => undefined,
        mealIsUpdating: false,
        mealsAreLoading: false
    }

    static propTypes = {
        meals: PropTypes.object,
        getMeals: PropTypes.func,
        useMeal: PropTypes.func,
        mealIsUpdating: PropTypes.bool,
        mealsAreLoading: PropTypes.bool
    }

    render() {
        return (
            <div className="dashboard col-12 d-flex flex-column">
                <Ribbon>
                    <Link to="meals/new" className="btn btn-sm btn-outline-accent">
                            new meal
                    </Link>
                </Ribbon>
                <p>filters</p>
                <div className="dashboard-main row flex-grow-1">
                    <div className="col-xs-12 col-md-4">
                        <div className="position-fixed">
                            <OverviewBase meals={ this.props.meals.unwrapOr([]) } />
                        </div>
                    </div>
                    <div className="meal-card-container col-xs-12 col-md-8 p-5">
                        {
                            this.props.meals.match({
                                Just: (m) => m.map((meal) => (
                                    <MealCard
                                        meal={ meal }
                                        key={ meal.id }
                                        useMeal={ this.props.useMeal }
                                        mealIsUpdating={ this.props.mealIsUpdating } />
                                )),
                                Nothing: () => <span>No meals</span>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        meals: meals(state),
        mealsAreLoading: isMealsLoading(state),
        mealIsUpdating: isMealsWorking(state)
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        useMeal: pipe(useMeal, dispatch)
    };
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardBase);


export { DashboardBase };
export default Dashboard;