import MealCard from 'Components/Dashboard/MealCard/MealCard';
import Overview from 'Components/Dashboard/Overview/Overview';
import Ribbon from 'Components/Ribbon/Ribbon';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'Styles/theme.sass';
import './Dashboard.sass';


class Dashboard extends React.Component {
    static defaultPropTypes = {
        meals: undefined,
        useMeal: () => undefined,
        logoutHandler: () => undefined
    }

    static propTypes = {
        meals: PropTypes.array,
        useMeal: PropTypes.func
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
                            <Overview meals={ this.props.meals } />
                        </div>
                    </div>
                    <div className="meal-card-container col-xs-12 col-md-8 p-5">
                        {this.props.meals && this.props.meals.map((meal) => <MealCard meal={ meal } useMeal={ this.props.useMeal } key={ meal.id } />)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;