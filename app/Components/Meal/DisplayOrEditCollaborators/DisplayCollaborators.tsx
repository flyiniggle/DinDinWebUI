import * as React from 'react';
import IUser from 'Business/Auth/Types/User';

import './DisplayCollaborators.sass'


interface IDisplayCollaboratorsProps {
    collaborators: IUser[]
}

function DisplayCollaborators(props: IDisplayCollaboratorsProps) {
    const { collaborators } = props;
    return (
        <div className="display-collaborators">
            { collaborators.map(c => <h2 className="user-display">{c.username.split('').shift()}</h2>) }
        </div>
    )
}

export { IDisplayCollaboratorsProps };
export default DisplayCollaborators;