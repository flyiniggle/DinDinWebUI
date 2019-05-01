import React from 'react';
import UserMenu from 'Components/Header/UserMenu';

import './Header.sass';

function Header(props) {
    return (
        <div className="header row d-flex justify-content-between">
            <div className="col-6 pb-1 logo">
                <h2>Din Din</h2>
            </div>
            <div className="col-6 pb-1 ">
                <UserMenu { ...props } />
            </div>
        </div>
    );
}

export default Header;