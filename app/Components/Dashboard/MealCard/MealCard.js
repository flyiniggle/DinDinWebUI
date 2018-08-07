import React from 'react';

import './MealCard.sass';

function MealCard({ meal }) {
    return (
        <div className="mealCard row p-lg-4 p-2 mb-2">
            <h2>{ meal.name }</h2>
            <span>{ meal.taste }</span>
            <span>{ meal.difficulty }</span>
            <h3>{ meal.last_used }</h3>
            <h4>Used { meal.used_count } times</h4>
        </div>
    );
}

export default MealCard;