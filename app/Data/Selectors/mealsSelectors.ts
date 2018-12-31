import { map, pipe } from 'ramda';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import IMeal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';
import getMealById from 'Business/Meals/getMealById';

const getMealsProp = safeGetProp('meals');

export const meals: (object) => Maybe<IMeal[]> = pipe(
    getMealsProp,
    Maybe.chain(getMealsProp)
);

export const meal = function (state: object, id: number): IMeal {
    const getMeal = getMealById(id);

    return pipe(
        meals,
        map(getMeal)
    )(state);
}

export const messages: (object) => Maybe<Message[]> = pipe(
    getMealsProp,
    Maybe.chain(safeGetProp('messages'))
);