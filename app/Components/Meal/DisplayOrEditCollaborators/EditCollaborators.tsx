import * as React from 'react';
import IUser from 'Business/Auth/Types/User';
import DisplayCollaborators, { IDisplayCollaboratorsProps } from './DisplayCollaborators';

interface IEditCollaboratorsProps extends IDisplayCollaboratorsProps {
    users: IUser[]
}

function EditCollaborators(props: IEditCollaboratorsProps) {
    const { collaborators, users } = props;

    return (<React.Fragment>
        <DisplayCollaborators collaborators={collaborators} />
        <select>
            {users.map(u => <option value={u.id}>{u.username}</option>)}
        </select>
    </React.Fragment>)
}


export default EditCollaborators