import * as React from 'react';
import { pipe, prop } from 'ramda';
import { Maybe } from 'true-myth';
import maybe from 'Business/Lib/maybe';
import dateString from 'UI/Formatting/dateString';

interface ILastUsedDisplayProps {
    date?: string
}

function renderLastUsed(lastUsedDate) {
    return (
        <div>
            <h4 className="d-inline">Last Used: </h4>
            <span className='lastUsed'>{lastUsedDate}</span>
        </div>
    );
};

const LastUsedDisplay: (ILastUsedDisplayProps) => JSX.Element = pipe(
    prop('lastUsed'),
    maybe,
    Maybe.map(dateString.display),
    Maybe.map(renderLastUsed),
    Maybe.getOr(null)
)

export {
    ILastUsedDisplayProps,
    renderLastUsed
}
export default LastUsedDisplay