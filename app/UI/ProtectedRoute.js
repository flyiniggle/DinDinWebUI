import authStatus from 'Business/Auth/authStatus';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = function({ component: Component, ...rest }) {
    return (
        <Route { ...rest }
            render={ (props) => (
                authStatus.loggedIn === true
                    ? <Component { ...props } />
                    : <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
            ) } />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.instanceOf(React.Component), PropTypes.func]),
    location: PropTypes.object
};


export default ProtectedRoute;