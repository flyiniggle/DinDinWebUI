import { pipe } from 'ramda';
import IMealEditorState from 'Data/Reducers/Types/IMealEditorState';
import Message from 'Business/Validation/Message';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';


const getMealEditorProp = safeGetProp('mealEditor');

export const isLoading: (state: IMealEditorState) => boolean = pipe(
    getMealEditorProp,
    Maybe.chain(safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const messages: (state: IMealEditorState) => Maybe<Message[]> = pipe(
    getMealEditorProp,
    Maybe.chain(safeGetProp('messages'))
);