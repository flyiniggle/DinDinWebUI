import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from 'Components/Dashboard/Dashboard';
import Splash from 'Components/Splash/Splash';

import 'Styles/core.sass';
import './DinDin.sass';

export default function() {
    return (
        <div className="background">
            <div className="container-fluid">
                <Switch>
                    <Route path="/" component={ Splash } />
                </Switch>
            </div>
        </div>
    );
}