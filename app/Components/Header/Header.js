import React from 'react';

import './Header.sass';

function Header(props) {
    return (
        <div className="headerContainer ">
            <div className="header position-fixed row d-flex justify-content-between">
                <div className="col-2">
                    <h2>Din Din</h2>
                </div>
                <div className="col-2">
                    <h2>This is me</h2>
                </div>
            </div>
        </div>
    );
}

export default Header;