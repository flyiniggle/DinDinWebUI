import { pipe } from 'ramda';
import IDashboardState from 'Data/Reducers/Types/IDashboardState';
import Message from 'Business/Validation/Message';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import RootState from 'Data/Reducers/Types/RootState';


const getDashboardProp: (s: RootState) => Maybe<IDashboardState> = safeGetProp('dashboard');

export const isLoading: (state: RootState) => boolean = pipe(
    getDashboardProp,
    Maybe.chain(safeGetProp('isLoading')),
    Maybe.unwrapOr(false)
);

export const messages: (state: RootState) => Maybe<Message[]> = pipe(
    getDashboardProp,
    Maybe.chain(safeGetProp('messages'))
);