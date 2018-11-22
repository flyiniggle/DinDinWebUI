import * as React from 'react';
import './Ribbon.sass';

function Ribbon(props) {
    return (
        <div className="ribbon">
            <div className="ribbon-content">
                {React.Children.map(props.children, child => (
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                    >
                        {React.cloneElement(child as React.ReactElement<any>)}
                    </button>
                ))
                }
            </div>
        </div>
    )
}

export default Ribbon;