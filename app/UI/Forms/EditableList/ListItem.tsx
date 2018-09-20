import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


interface IListItem {
    text: string
    key: number,
    handleRemove: (number) => void
}

function ListItem(props: IListItem) {
    return (
        <div className="list-item">
            {props.text}
            <span onClick={() => {
                props.handleRemove(props.key)
            }}>
                <FontAwesomeIcon icon={faMinus} />
            </span>
        </div>
    )
}

export default ListItem
export { IListItem };