import UserContext from 'Business/Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { DesktopScreen } from 'react-responsive-redux';

interface UserMenuProps {
    logoutHandler: () => void
}
function UserMenu(props: UserMenuProps) {
    return (
        <UserContext.Consumer>
            {username => (
                <div className="d-flex align-items-center justify-content-end">
                    <h2 className="d-inline"><FontAwesomeIcon icon={faUserCircle} /> {username}</h2>
                    <DesktopScreen className="d-inline">
                        <button
                            type="button"
                            onClick={props.logoutHandler}
                            className="btn btn-sm btn-outline-primary">
                            Log out
                        </button>
                    </DesktopScreen>
                </div>
            )
            }
        </UserContext.Consumer>
    );
}

export default UserMenu;