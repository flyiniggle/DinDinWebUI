import * as React from 'react';
import { pipe } from 'ramda';
import { Maybe } from 'true-myth';
import dateString from 'UI/Formatting/dateString';
import safeGetProp from 'Business/Lib/safeGetProp';

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
    safeGetProp('date'),
    Maybe.map(dateString.display),
    Maybe.map(renderLastUsed),
    Maybe.getOr(null)
)

export {
    ILastUsedDisplayProps,
    renderLastUsed
}
export default LastUsedDisplay