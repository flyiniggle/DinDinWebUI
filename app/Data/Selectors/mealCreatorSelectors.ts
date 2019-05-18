import { pipe } from 'ramda';
import IMealCreatorState from 'Data/Reducers/Types/IMealCreatorState';
import Message from 'Business/Validation/Message';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import INewMeal from 'Business/Meals/Types/NewMeal';



interface IMealSelectorStateProp {
    mealCreator: IMealCreatorState,
    [x: string]: any 
}

const getMealCreatorProp = safeGetProp('mealCreator');

export const newMeal = function(state: IMealSelectorStateProp): INewMeal {
    return state.mealCreator.newMeal
}

export const isSaved: (state: IMealSelectorStateProp) => boolean = pipe(
    getMealCreatorProp,
    Maybe.chain(<(o: object) => Maybe<boolean>><unknown>safeGetProp('isSaved')),
    Maybe.unwrapOr(false)
);

export const isLoading: (state: IMealSelectorStateProp) => boolean = pipe(
    getMealCreatorProp,
    Maybe.chain(<(o: object) => Maybe<boolean>><unknown>safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const messages: (state: IMealSelectorStateProp) => Maybe<Message[]> = pipe(
    getMealCreatorProp,
    Maybe.chain(safeGetProp('messages'))
);