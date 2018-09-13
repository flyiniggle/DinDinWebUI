import MealCard from 'Components/Dashboard/MealCard/MealCard';
import Overview from 'DinDin/Components/Dashboard/Overview/Overview';
import React from 'react';
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
            <div className="d-flex flex-column justify-content-end">
                <div className="row">
                    <div className="col-xs-12">
                        filters
                    </div>
                </div>
                <div className="main-container row flex-grow-1">
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