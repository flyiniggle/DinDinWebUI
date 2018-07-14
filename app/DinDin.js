import React from 'react';
import { Link, Route } from 'react-router-dom';

import Dashboard from 'Components/Dashboard/Dashboard';

import 'Styles/core.sass';

export default function() {
    return (
        <div>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
            </nav>
            <div>
                <Route path="/dashboard" component={ Dashboard } />
            </div>
        </div>
    );
}