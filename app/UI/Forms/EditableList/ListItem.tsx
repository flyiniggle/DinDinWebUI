import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';


interface IListAdder {
    text: string
    id: number,
    handleRemove: (number) => void
}

function ListItem(props: IListAdder) {
    return (
        <div className="list-item input-group mb-2">
            <span className="form-control form-control-sm">{props.text}</span>
            <span
                onClick={() => { props.handleRemove(props.id) }}
                className="input-group-append"
            >
                <AsyncButton className="btn btn-sm btn-outline-primary">
                    <FontAwesomeIcon icon={faMinus} />
                </AsyncButton>
            </span>
        </div>
    )
}

export default ListItem
export { IListAdder };