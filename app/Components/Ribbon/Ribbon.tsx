import * as React from 'react';
import './Ribbon.sass';

function Ribbon(props) {
    return (
        <div className="ribbon">
            {
                React.Children.map(
                    props.children,
                    (child) => <div className="ribbon-item">{child}</div>
                )
            }
        </div>
    )
}

export default Ribbon;