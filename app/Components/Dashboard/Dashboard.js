import Ribbon from 'Components/Ribbon/Ribbon';
import { pipe } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MealCard from 'Components/Dashboard/MealCard/MealCard';
import OverviewBase from 'Components/Dashboard/Overview/Overview';
import { getMeals } from 'Data/ActionCreators/mealActionCreators';
import { meals } from 'Data/Selectors/mealsSelectors';

import 'Styles/theme.sass';
import './Dashboard.sass';


class DashboardBase extends React.Component {
    static defaultPropTypes = {
        meals: undefined,
        logoutHandler: () => undefined,
        getMeals: () => undefined
    }

    static propTypes = {
        meals: PropTypes.object,
        getMeals: PropTypes.func
    }

    componentWillMount = () => {
        this.props.getMeals();
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
                                Just: (m) => m.map((meal) => <MealCard meal={ meal } key={ meal.id } />),
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
        meals: meals(state)
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getMeals: pipe(getMeals, dispatch)
    };
};

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardBase);


export { DashboardBase };
export default Dashboard;