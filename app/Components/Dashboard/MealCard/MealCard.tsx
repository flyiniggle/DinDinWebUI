import * as React from 'react';
import Meal from 'Business/Meals/Types/Meal';

import './MealCard.sass';

interface MealCardProps {
    meal: Meal
}

function MealCard({ meal }: MealCardProps) {
    return (
        <div className="mealCard row p-lg-4 p-2 mb-2">
            <div className="col-4">
                <h2>{ meal.name }</h2>
                <h4>Last Used: { meal.lastUsed }</h4>
            </div>
            <div className="col-4">
                <div><h4 className="d-inline">Taste: </h4>{ meal.taste }</div>
                <div><h4 className="d-inline">Difficulty: </h4>{ meal.difficulty }</div>
            </div>
            <div className="col-4">
                <button className="btn btn-primary" type="button">Use it!</button>
                <h4>Used { meal.usedCount } { (meal.usedCount === 1) ? 'time' : 'times' }</h4>
            </div>

        </div>
    );
}

export default MealCard;