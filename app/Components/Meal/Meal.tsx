import * as React from 'react';
import { ReactComponentProps } from 'react-router-dom';
import getMealById from 'Business/Meals/getMealById';
import Header from 'Components/Header/Header';
import TextInput from 'UI/Forms/TextInput/TextInput';
import dateString from 'UI/Formatting/dateString';
import Meal from 'Business/Meals/Types/Meal';

interface MealProps {
    meals?: Meal[],
    logoutHandler: () => void,
    match: ReactComponentProps,
    useMeal: (Meal) => Promise<void>
}

function Meal(props: MealProps) {
    if (!props.meals) {
        return <p>Loading...</p>
    }
    const meal = getMealById(props.match.params.id, props.meals);

    return (
        <div className="mainBackground container-fluid dashboard">
            <div className="row">
                <div className="col-12">
                    <Header logoutHandler={props.logoutHandler} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <h2>
                        {meal.name}</h2>
                    <div><h4 className="d-inline">Taste: </h4><span className="taste">{meal.taste}</span></div>
                    <div><h4 className="d-inline">Difficulty: </h4><span className="difficulty">{meal.difficulty}</span></div>
                </div>
                <div className="col-12 col-lg-6">
                    <h4>Last Used: </h4><span className='lastUsed'>{dateString.display(meal.lastUsed)}</span>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={function (event) {
                            event.stopPropagation();
                            event.preventDefault();
                            return props.useMeal(meal);
                        }}>Use it!</button>
                    <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h4>Notes:</h4>
                    <span>{meal.notes}</span>
                </div>
            </div>
        </div>
    );
}

export default Meal;