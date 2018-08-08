import MealsService from 'Business/Meals/Service';
import MealCard from 'Components/Dashboard/MealCard/MealCard';
import Overview from 'DinDin/Components/Dashboard/Overview/Overview';
import Header from 'DinDin/Components/Header/Header';
import React from 'react';
import PropTypes from 'prop-types';

import 'Styles/theme.sass';


class Dashboard extends React.Component {
    defaultPropTypes = {
        meals: undefined
    }

    propTypes = {
        meals: PropTypes.array,
        setMeals: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        if (!this.props.meals) {
            MealsService.get()
                .then(this.props.setMeals);
        }
    }

    render() {
        return (
            <div className="mainBackground">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Header />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            filters
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-4">
                            <Overview meals={ this.props.meals } />
                        </div>
                        <div className="col-xs-12 col-md-8">
                            {this.props.meals && this.props.meals.map((meal) => <MealCard meal={ meal } />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;