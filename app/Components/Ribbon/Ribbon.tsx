import * as React from 'react';
import './Ribbon.sass';

function Ribbon(props) {
    return (
        <div className="ribbon">
            <div className="ribbon-content">
                {props.children}
            </div>
        </div>
    )
}

export default Ribbon;