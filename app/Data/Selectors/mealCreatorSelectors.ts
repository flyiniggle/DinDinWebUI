import { pipe } from 'ramda';
import IMealCreatorState from 'Data/Reducers/Types/IMealCreatorState';
import Message from 'Business/Validation/Message';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';


const getMealCreatorProp = safeGetProp('mealCreator');

export const isLoading: (state: IMealCreatorState) => boolean = pipe(
    getMealCreatorProp,
    Maybe.chain(safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const messages: (state: IMealCreatorState) => Maybe<Message[]> = pipe(
    getMealCreatorProp,
    Maybe.chain(safeGetProp('messages'))
);