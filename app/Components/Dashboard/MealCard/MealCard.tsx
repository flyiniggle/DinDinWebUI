import { pipe } from 'ramda';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Maybe } from 'true-myth';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import { faTired as solidTired, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faTired as emptyTired, faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import maybe from 'Business/Lib/maybe';
import Meal from 'Business/Meals/Types/Meal';
import dateString from 'UI/Formatting/dateString';
import RatingDisplay, { IRatingDisplayProps } from 'UI/Forms/Rating/RatingDisplay';

import './MealCard.sass';


function renderLastUsed(lastUsedDate: string) {
    return (
        <>
            <h4 className='d-inline'>Last Used: </h4>
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

interface IMealCardProps {
    key?: any
    meal: Meal
    useMeal: (meal: Meal) => void,
    mealIsUpdating: boolean
}

function MealCard(props: IMealCardProps) {
    const { meal, useMeal, mealIsUpdating: isMealUpdating } = props;
    const difficultyDisplayProps: IRatingDisplayProps = {
        selectedIcon: solidTired,
        unselectedIcon: emptyTired,
        className: 'meal-card-rating',
        range: 5,
        value: meal.difficulty
    }
    const tasteDisplayProps: IRatingDisplayProps = {
        selectedIcon: solidStar,
        unselectedIcon: emptyStar,
        className: 'meal-card-rating',
        range: 5,
        value: meal.taste
    }
    const handleUseMeal = function (e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();

        useMeal(meal);
    }

    return (
        <Link to={`/meals/${meal.id}`} className="mealCard row p-lg-4 p-2 mb-2">
            <div className="col-12 col-md-4">
                <h2>{meal.name}</h2>
                {displayLastUsed(meal.lastUsed)}
            </div>
            <div className="col-12 col-md-8 col-lg-5 d-flex flex-column">
                <div className="taste">
                    <h4 className="d-inline">Taste: </h4>
                    <RatingDisplay {...tasteDisplayProps} />
                </div>
                <div className="difficulty">
                    <h4 className="d-inline">Difficulty: </h4>
                    <RatingDisplay {...difficultyDisplayProps} />
                </div>
            </div>
            <DesktopScreen className="col-md-3">
                <button
                    className="btn btn-primary useMealButton"
                    type="button"
                    onClick={handleUseMeal}>Use it!</button>
                <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
            </DesktopScreen>
            <MobileScreen className="col-12">
                <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
            </MobileScreen>
            <MobileScreen className="col-12">
                <button
                    className="btn btn-primary btn-sm btn-block useMealButton"
                    type="button"
                    onClick={handleUseMeal}>Use it!</button>
            </MobileScreen>
        </Link>
    );
}

export { IMealCardProps }
export default MealCard;