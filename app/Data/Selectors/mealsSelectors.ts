import { pipe } from 'ramda';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import Meal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';
import getMealById from 'Business/Meals/getMealById';
import IMealsState from 'Data/Reducers/Types/IMealsState';
import RootState from 'Data/Reducers/Types/RootState';


function getMealsProp(x: RootState | IMealsState): Maybe<unknown> {
    return safeGetProp('meals', x);
}

export const meals: (state: RootState) => Maybe<Meal[]> = pipe(
    <(x: { meals: IMealsState }) => Maybe<IMealsState>>getMealsProp,
    Maybe.chain(<(x: IMealsState) => Maybe<Meal[]>>getMealsProp)
);

export const meal = function (state: RootState, id: number): Maybe<Meal> {
    const getMeal = getMealById(id);

    return pipe(
        meals,
        Maybe.map(getMeal)
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