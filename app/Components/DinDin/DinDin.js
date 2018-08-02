import DinDinService from 'Business/Services/DinDinService';
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from 'Components/Dashboard/Dashboard';
import Splash from 'Components/Splash/Splash';

import 'Styles/core.sass';
import './DinDin.sass';

class DinDin extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: true
        };
    }

    componentWillMount = () => {
        DinDinService.addNotLoggedInHandler(this.logOut);
    }

    logOut = () => {
        this.setState({loggedIn: false});
    }

    render() {
        if (!this.state.loggedIn) {
            return <Redirect to="/login" />;
        }

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
}

export default DinDin;