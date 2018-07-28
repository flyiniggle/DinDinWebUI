import React from 'react';
import Login from 'Components/Login/Login';

import './Splash.sass';


function getView(view = 'welcome') {
    switch (view) {
    case 'welcome':
        return <span>Welcome!</span>;
    case 'signup':
        return <span>Come sign up!</span>;
    case 'login':
        return <Login />;
    }
}

class Splash extends React.Component {
    constructor() {
        super();
        this.state = {
            currentView: 'welcome'
        };
    }

    show = (view = 'welcome') => {
        this.setState({ currentView: getView(view) });
    }

    render() {
        return (
            <div className="splash">
                <div className="row header d-flex flex-row-reverse">
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ () => { this.show('login'); } }>
                            Log in
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ () => { this.show('signup'); } }>
                            Sign up!
                        </button>
                    </div>
                </div>
                <div>{ this.state.currentView }</div>
            </div>
        );
    }
}

export default Splash;