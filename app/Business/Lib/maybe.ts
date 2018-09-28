import { Maybe } from 'true-myth';
import { isNil } from 'ramda';

function maybe<T>(value: T): Maybe<T> {
    return isNil(value) ? Maybe.nothing() : Maybe.of(value);
}

export default maybe;