import { pipe } from 'ramda';
import { Maybe } from 'true-myth';
import safeGetProp from 'Business/Lib/safeGetProp';
import IUser from 'Business/Auth/Types/User';


const getUserStore: (object) => Maybe<IUser> = safeGetProp('user')

export const email = pipe(
    getUserStore,
    Maybe.chain(safeGetProp('email'))
);

export const username = pipe(
    getUserStore,
    Maybe.chain(safeGetProp('username'))
);