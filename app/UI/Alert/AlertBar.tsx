import * as React from 'react';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';


interface IAlertBarProps {
    level: ErrorLevel,
    children: any
}

const getLevelClassName = function (level: ErrorLevel): string {
    const map = {
        [ErrorLevel.error]: 'alert-danger',
        [ErrorLevel.warning]: 'alert-warning',
        [ErrorLevel.info]: 'alert-info',
        [ErrorLevel.ok]: 'alert-success',
    };

    return map[level];
}

function AlertBar(props) {
    const levelClass = getLevelClassName(props.level);

    return (
        <div className={`alert ${levelClass}`} role="alert">
            {props.children}
        </div>
    )
}


export default AlertBar