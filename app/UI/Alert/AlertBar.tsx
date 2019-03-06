import * as React from 'react';
import safeGetProp from 'Business/Lib/safeGetProp';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import IMessage from 'Business/Validation/Types/Message';

import './AlertBar.sass';


interface IAlertBarProps {
    type?: ErrorLevel,
    message?: IMessage
    dismissMessage: () => void
    children?: any
}

const getLevelSuffix = function (level: ErrorLevel): string {
    const map = {
        [ErrorLevel.error]: 'danger',
        [ErrorLevel.warning]: 'warning',
        [ErrorLevel.info]: 'info',
        [ErrorLevel.ok]: 'success',
    };

    return map[level] || ErrorLevel.info;
}

function AlertBar(props: IAlertBarProps) {
    const { type, message, dismissMessage, children } = props
    const level = type || safeGetProp('type', message).unwrapOr(null);
    const levelSuffix = getLevelSuffix(level);

    return (
        <div className={`alert alert-bar alert-${levelSuffix} d-flex justify-content-between`} role="alert">
            {message && message.message}
            {children}
            <button
                type="button"
                className={`btn btn-sm btn-outline-${levelSuffix}`}
                onClick={dismissMessage}
            >dismiss</button>
        </div>
    )
}


export default AlertBar