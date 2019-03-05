import * as React from 'react';
import './AlertContainer.sass'

function AlertContianer(props) {
    return <div className='alert-container'>{props.children}</div>
}

export default AlertContianer