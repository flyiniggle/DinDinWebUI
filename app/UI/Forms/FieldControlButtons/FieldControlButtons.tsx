import * as React from 'react';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

interface IFieldControlButtonsProps {
    doSave: () => void | Promise<void>;
    submitting: boolean;
    doCancel: (e: Event) => void;
    append?: boolean
}

function FieldControlButtons(props: IFieldControlButtonsProps) {
    const displayProps = props.append
        ? { className: 'input-group-append' }
        : {
            className: 'float-right btn-group',
            role: 'group'
        };

    return (
        <div {...displayProps}>
            <AsyncButton className="field-control-save btn btn-primary" onClick={props.doSave} working={props.submitting}>
                <FontAwesomeIcon icon={faCheck} />
            </AsyncButton>
            <AsyncButton className="field-control-cancel btn btn-outline-primary" onClick={props.doCancel}>
                <FontAwesomeIcon icon={faBan} />
            </AsyncButton>
        </div>
    )
}

export default FieldControlButtons;
export { IFieldControlButtonsProps };