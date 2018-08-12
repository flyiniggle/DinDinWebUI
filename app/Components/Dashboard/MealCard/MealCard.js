import React from 'react';

import './MealCard.sass';

function MealCard({ meal }) {
    return (
        <div className="mealCard row p-lg-4 p-2 mb-2">
            <div className="col-4">
                <h2>{ meal.name }</h2>
                <h4>Last Used: { meal.last_used }</h4>
            </div>
            <div className="col-4">
                <p><h4 className="d-inline">Taste: </h4>{ meal.taste }</p>
                <p><h4 className="d-inline">Difficulty: </h4>{ meal.difficulty }</p>
            </div>
            <div className="col-4">
                <button className="btn btn-primary" type="button">Use it!</button>
                <h4>Used { meal.used_count } { (meal.used_count === 1) ? 'time' : 'times' }</h4>
            </div>

        </div>
    );
}

export default MealCard;