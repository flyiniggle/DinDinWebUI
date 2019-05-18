import { pipe } from 'ramda';
import IMealEditorState from 'Data/Reducers/Types/IMealEditorState';
import Message from 'Business/Validation/Message';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import RootState from 'Data/Reducers/Types/RootState';


const getMealEditorProp:(s: RootState) => Maybe<IMealEditorState> = safeGetProp('mealEditor');

export const isWorking: (state: RootState) => boolean = pipe(
    getMealEditorProp,
    Maybe.chain(safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const messages: (state: RootState) => Maybe<Message[]> = pipe(
    getMealEditorProp,
    Maybe.chain(safeGetProp('messages'))
);