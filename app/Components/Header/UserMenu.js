import UserContext from 'Business/Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';


function UserMenu(props) {
    return (
        <UserContext.Consumer>
            {username => (
                <div className="d-flex align-items-baseline">
                    <h2 className="d-inline"><FontAwesomeIcon icon={ faUserCircle } /> {username}</h2>
                    <button
                        type="button"
                        onClick={ props.logoutHandler }
                        className="btn btn-sm btn-outline-primary">
                        Log out
                    </button>
                </div>
            )
            }
        </UserContext.Consumer>
    );
}

export default UserMenu;