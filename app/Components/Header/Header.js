import React from 'react';
import UserContext from 'Business/Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import './Header.sass';

function Header() {
    return (
        <div className="headerContainer ">
            <div className="header position-fixed row d-flex justify-content-between">
                <div className="col-2">
                    <h2>Din Din</h2>
                </div>
                <div className="col-2">
                    <UserContext.Consumer>
                        {username => <h2><FontAwesomeIcon icon={ faUserCircle } /> {username}</h2>}
                    </UserContext.Consumer>
                </div>
            </div>
        </div>
    );
}

export default Header;