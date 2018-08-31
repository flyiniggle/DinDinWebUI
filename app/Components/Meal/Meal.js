import React from 'react';
import getMealById from 'Business/Meals/getMealById';
import Header from 'Components/Header/Header';
import TextInput from 'UI/Forms/TextInput/TextInput';

function Meal(props) {
    const meal = getMealById(props.match.params.id, props.meals);

    return (
        <div className="mainBackground container-fluid dashboard">
            <div className="row">
                <div className="col-12">
                    <Header logoutHandler={ props.logoutHandler } />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <TextInput value={ meal.name } />
                </div>
                <div className="col-12 col-lg-6">
                    <span>{meal.lastUsed}</span>
                </div>
            </div>
        </div>
    );
}

export default Meal;