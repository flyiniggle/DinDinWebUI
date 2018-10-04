import * as React from 'react';
import { pipe, prop } from 'ramda';
import { Maybe } from 'true-myth';
import maybe from 'Business/Lib/maybe';


interface IUsedCountDisplayProps {
    usedCount?: number
}

const renderUsedCount = count => <h4 className="usedCount">Used {count} {(count === 1) ? 'time' : 'times'}</h4>;

const usedCountDisplay: (IUsedCountDisplayProps) => JSX.Element = pipe(
    prop('usedCount'),
    maybe,
    Maybe.map(renderUsedCount),
    Maybe.getOr(null)
)

export {
    IUsedCountDisplayProps,
    renderUsedCount
}
export default usedCountDisplay;
