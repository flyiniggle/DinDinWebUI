import { pipe } from 'ramda';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import Meal from 'Business/Meals/Types/Meal';
import dateString from 'UI/Formatting/dateString';

import './MealCard.sass';
import maybe from 'Business/Lib/maybe';

interface ILastUsedDisplayProps {
    date?: string
}

function renderLastUsed(lastUsedDate: string) {
    return (
        <>
        <h4>Last Used: </h4>
        <span className='lastUsed'>{lastUsedDate}</span>
        </>
    );
};

const displayLastUsed: (date: string) => JSX.Element | null = pipe(
    maybe,
    Maybe.map(dateString.display),
    Maybe.map(renderLastUsed),
    Maybe.getOr(null)
)

interface MealCardProps {
    meal: Meal
    useMeal: (meal: Meal) => void,
    mealIsUpdating: boolean
}

function MealCard(props: MealCardProps) {
    const { meal, useMeal, mealIsUpdating: isMealUpdating } = props;
    const handleUseMeal = function (e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();

        useMeal(meal);
    }

    return (
        <Link to={`/meals/${meal.id}`} className="mealCard row p-lg-4 p-2 mb-2">
            <div className="col-4">
                <h2>{meal.name}</h2>
                { displayLastUsed(meal.lastUsed) }
            </div>
            <div className="col-4">
                <div><h4 className="d-inline">Taste: </h4><span className="taste">{meal.taste}</span></div>
                <div><h4 className="d-inline">Difficulty: </h4><span className="difficulty">{meal.difficulty}</span></div>
            </div>
            <div className="col-4">
                <button
                    className="btn btn-primary useMealButton"
                    type="button"
                    onClick={handleUseMeal}>Use it!</button>
                <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
            </div>
        </Link>
    );
}


export default MealCard;