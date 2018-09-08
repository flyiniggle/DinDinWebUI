import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponentProps } from 'react-router-dom';
import getMealById from 'Business/Meals/getMealById';
import Header from 'Components/Header/Header';
import TextInput from 'UI/Forms/TextInput/TextInput';
import dateString from 'UI/Formatting/dateString';
import IMeal from 'Business/Meals/Types/Meal';

import './Meal.sass';

interface MealProps {
    meals?: IMeal[],
    logoutHandler: () => void,
    match: ReactComponentProps,
    useMeal: (Meal) => Promise<void>
}

function Meal(props: MealProps) {
    if (!props.meals) {
        return <p>Loading...</p>
    }
    const meal: IMeal = getMealById(props.match.params.id, props.meals);

    return (
        <div className="meal mainBackground container-fluid">
            <div className="row">
                <div className="col-12">
                    <Header logoutHandler={props.logoutHandler} />
                </div>
            </div>
            <div className="row m-2">
                <h1>{meal.name}</h1>
            </div>
            <div className="row m-2">
                <div className="col-12 col-lg-2">
                    <h4>Ingredients</h4>
                </div>
                <div className="col-12 col-lg-5">
                    <div><h4 className="d-inline">Taste: </h4><span className="taste">{meal.taste}</span></div>
                    <div><h4 className="d-inline">Difficulty: </h4><span className="difficulty">{meal.difficulty}</span></div>
                </div>
                <div className="col-12 col-lg-5">
                    <div><h4 className="d-inline">Last Used: </h4><span className='lastUsed'>{dateString.display(meal.lastUsed)}</span></div>

                    <h4 className="usedCount">Used {meal.usedCount} {(meal.usedCount === 1) ? 'time' : 'times'}</h4>
                </div>
            </div>
            <div className="row m-2">
                <div className="col-12">
                    <h4>Notes:</h4>
                    <span>{meal.notes}</span>
                </div>
            </div>
            <div className="row m2">
                <div className="col-2 d-flex justify-content-between">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={function (event) {
                            event.stopPropagation();
                            event.preventDefault();
                            return props.useMeal(meal);
                        }}>Use it!</button>

                    <Link to="/dashboard" className="btn btn-outline-primary">close</Link>
                </div>
            </div>
        </div>
    );
}

export default Meal;