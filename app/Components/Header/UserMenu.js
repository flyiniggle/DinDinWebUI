import UserContext from 'Business/Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function UserMenu() {
    return (
        <UserContext.Consumer>
            {username => <h2><FontAwesomeIcon icon={ faUserCircle } /> {username}</h2>}
        </UserContext.Consumer>
    );
}

export default UserMenu;