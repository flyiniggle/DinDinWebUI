import MealsService from 'Business/Meals/Service';
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
                        <div className="col-xs-12">
                            filters
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-4">
                            overview
                        </div>
                        <div className="col-xs-12 col-md-8">
                            {this.props.meals && this.props.meals.map((meal) => <li>{ meal.name }</li>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;