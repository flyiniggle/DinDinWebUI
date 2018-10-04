import * as React from 'react';
import ListItem from 'UI/Forms/EditableList/ListItem';
import ListItemAdder from 'UI/Forms/EditableList/ListItemAdder';

interface IEditableListProps {
    list: Array<string>,
    onChange: (a: string[]) => void,
    className?: string
}

interface State {
    newValue: string
}

class EditableList extends React.Component<IEditableListProps, State> {
    readonly state: State = {
        newValue: ''
    }

    removeItem = (key: number): void => {
        const updatedList = this.props.list.filter((v, i) => i !== key);
        this.props.onChange(updatedList);
    }

    addItem = (val: string): void => {
        this.props.onChange([...this.props.list, val]);
    }

    render() {
        return (
            <div className={`editableList ${this.props.className}`}>
                {this.props.list.map((li, i) => <ListItem key={i} id={i} text={li} handleRemove={this.removeItem} />)}
                <ListItemAdder addHandler={this.addItem} />
            </div>
        )
    }
}

export default EditableList;
export { IEditableListProps };