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
    const renderMealNamesList: (m: Meal[]) => JSX.Element[] = map((meal: Meal) => <li key={ meal.id }>{meal.name}</li>);
    type pipeFour<A, B, C, D, E> = (
        first: (a: A) => B,
        second: (b: B) => C,
        third: (c: C) => D,
        fourth: (d: D) => E
    ) => (a: A) => E
    let mostPreparedPipe: pipeFour<Meal[], Meal[], Meal[], Meal[], JSX.Element[]> = pipe;
    let leastPreparedPipe: pipeFour<Meal[], Meal[], Meal[], Meal, string> = pipe;
    const threeMostPrepared = pipe(sortMostUsed, getFirstThree, renderMealNamesList);
    const threeLeastPrepared = mostPreparedPipe(sortMostUsed, reverse, getFirstThree, renderMealNamesList);
    const lastMeal = leastPreparedPipe(sortRecentlyPrepared, reverse, last, prop('name'));

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