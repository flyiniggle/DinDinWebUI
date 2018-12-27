import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { connect } from 'react-redux'
import { Maybe } from 'true-myth';

import { username, email } from "Data/Selectors/userSelectors";

interface UserMenuProps {
    logoutHandler: () => void
    username: Maybe<string>
    email: Maybe<string>
}
function UserMenuBase(props: UserMenuProps) {
    const { username } = props;

    return (
            <div className="d-flex align-items-baseline">
            <h2 className="d-inline"><FontAwesomeIcon icon={faUserCircle} /> {username.unwrapOr('not logged in')}</h2>
                <button
                    type="button"
                    onClick={props.logoutHandler}
                    className="btn btn-sm btn-outline-primary">
                    Log out
                </button>
            </div>
    );
}

const mapStateToProps = function(state) {
    return {
        username: username(state),
        email: email(state)
    }
}

const UserMenu = connect(mapStateToProps, {})(UserMenuBase);

export default UserMenu;