import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'Components/Dashboard/Dashboard';
import Login from 'Components/Login/Login';

import 'Styles/core.sass';

export default function() {
    return (
        <div className="container">
            <Switch>
                <Route path="/" component={ Login } />
                <Route path="/login" component={ Login } />
            </Switch>
        </div>
    );
}