import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


interface IAsyncButtonProps {
    working?: boolean
}

function AsyncButton(props: IAsyncButtonProps & any) {
    const { working, ...rest } = props;

    return (
        <button type="button" {...rest}>{
            props.working
                ? <FontAwesomeIcon icon={faCircleNotch} spin />
                : props.children
        }</button>
    );
}

export default AsyncButton;