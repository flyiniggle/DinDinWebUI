import * as React from 'react';
import { map, pipe, prop, propEq } from 'ramda';
import IUser from 'Business/Auth/Types/User';
import { Maybe } from 'true-myth';

import './Collaborations.sass';


interface ICollaborationsProps {
    currentUserName: string
    ownerName: string
    collaborations: number[]
    users: IUser[]
}

function Collaborations(props: ICollaborationsProps) {
    const { ownerName, currentUserName, collaborations, users } = props;
    const isMyMeal = ownerName === currentUserName;
    const ownerDisplay = isMyMeal ? 'my meal' : `${ownerName}'s meal`;
    const renderUserFromId = pipe(
        id => Maybe.find(propEq('id', id), users),
        map(prop('username')),
        map(u => <h2 className="user-display">{u.split('').shift()}</h2>),
        Maybe.unwrapOr(null)
    )
    const collaboratorsDisplay = collaborations.map(renderUserFromId)

    return (
        <div className="collaborations d-flex justify-content-between align-items-center">
            <span className="badge badge-primary">{ownerDisplay}</span>
            <div className="d-inline">{collaboratorsDisplay}</div>
        </div>
    )
}

export { ICollaborationsProps };
export default Collaborations;