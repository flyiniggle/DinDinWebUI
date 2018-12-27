import { pipe } from 'ramda';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import IMeal from 'Business/Meals/Types/Meal';

const getMealsProp = safeGetProp('meals');

export const meals: (object) => Maybe<IMeal> = pipe(
    getMealsProp,
    Maybe.chain(getMealsProp)
);