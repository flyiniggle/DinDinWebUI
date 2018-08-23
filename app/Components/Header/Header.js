import React from 'react';
import Ionicon from 'react-ionicons'
import UserContext from 'Business/Auth/UserContext';

import './Header.sass';

function Header(props) {
    return (
        <div className="headerContainer ">
            <div className="header position-fixed row d-flex justify-content-between">
                <div className="col-2">
                    <h2>Din Din</h2>
                </div>
                <div className="col-2">
                    <UserContext.Consumer>
                        { username => <div><i className="far fa-user-circle"></i><h2>{username}</h2></div> }
                    </UserContext.Consumer>
                </div>
            </div>
        </div>
    );
}

export default Header;