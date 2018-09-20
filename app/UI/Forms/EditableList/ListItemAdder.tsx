import * as React from 'react';
import TextInput from 'UI/Forms/TextInput/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IListItemAdder {
    addHandler: (string) => void,
}

interface State {
    val: string
}

class ListItemAdder extends React.Component<IListItemAdder, State> {
    readonly state: State = {
        val: ''
    }

    add = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.addHandler(this.state.val);
        this.setState({ val: '' });
    }

    render() {
        return (
            <div className="ListItemAdder">
                <TextInput value={this.state.val} onChange={(e) => { this.setState({ val: e.target.value }) }} />
                <span onClick={this.add}>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
            </div>
        )
    }
}

export default ListItemAdder