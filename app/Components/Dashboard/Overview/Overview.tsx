import { sortMostUsed, sortRecentlyPrepared } from 'Business/Meals/sorting';
import Meal from "Business/Meals/Types/Meal";
import * as React from 'react';
import { slice, map, last, pipe, prop, reverse} from 'ramda';

import './Overview.sass';

interface OverviewProps {
    meals?: Array<Meal>
}

const Overview = function(props: OverviewProps) {
    const meals = props.meals || [];
    const getFirstThree = slice(0, 3);
    const renderMealNamesList = map((meal: Meal) => <li key={ meal.id }>{meal.name}</li>);
    const threeMostPrepared = pipe(sortMostUsed, getFirstThree, renderMealNamesList);
    const threeLeastPrepared = pipe(sortMostUsed, reverse, getFirstThree, renderMealNamesList);
    const lastMeal = pipe(sortRecentlyPrepared, reverse, last, prop('name'));

    return (
        <div className="overview">
            <div className="row p-3">
                <div className="col-xs-4 col-md-12">
                    <h3>Last Meal</h3>
                    <p>{ lastMeal(meals) }</p>
                </div>

                <div className="col-xs-4 col-md-12">
                    <h3>Most Prepared</h3>
                    <ul className="list-unstyled">
                        { threeMostPrepared(meals) }
                    </ul>
                </div>

                <div className="col-xs-4 col-md-12">
                    <h3>Least Prepared</h3>
                    <ul className="list-unstyled">
                        { threeLeastPrepared(meals) }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Overview;