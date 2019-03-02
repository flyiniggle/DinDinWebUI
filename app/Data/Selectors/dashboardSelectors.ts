import { pipe } from 'ramda';
import IDashboardState from 'Data/Reducers/Types/IDashboardState';
import Message from 'Business/Validation/Message';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';


const getDashboardProp = safeGetProp('dashboard');

export const isLoading: (state: IDashboardState) => boolean = pipe(
    getDashboardProp,
    Maybe.chain(safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const messages: (state: IDashboardState) => Maybe<Message[]> = pipe(
    getDashboardProp,
    Maybe.chain(safeGetProp('messages'))
);