import { map, pipe } from 'ramda';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import Meal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';
import getMealById from 'Business/Meals/getMealById';
import IMealsState from 'Data/Reducers/Types/IMealsState';

const getMealsProp: (state: IMealsState) => Maybe<Meal[]> = safeGetProp('meals');

export const meals: (state: IMealsState) => Maybe<Meal[]> = pipe(
    getMealsProp,
    Maybe.chain(getMealsProp)
);

export const meal = function (state: IMealsState, id: number): Maybe<Meal> {
    const getMeal = getMealById(id);

    return pipe(
        meals,
        map(getMeal)
    )(state);
}

export const messages: (state: IMealsState) => Maybe<Message[]> = pipe(
    getMealsProp,
    Maybe.chain(safeGetProp('messages'))
);

export const isLoading: (state: IMealsState) => boolean = pipe(
    getMealsProp,
    Maybe.chain(safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const isWorking: (state: IMealsState) => boolean = pipe(
    getMealsProp,
    Maybe.chain(safeGetProp('isWorking')),
    Maybe.unwrapOr(false)
);