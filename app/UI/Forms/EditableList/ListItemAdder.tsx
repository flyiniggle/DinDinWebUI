import * as React from 'react';
import TextInput from 'UI/Forms/TextInput/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';

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
            <div className="ListItemAdder row">
                <span className="input-group">
                    <TextInput
                        className="form-control form-control-sm"
                        value={this.state.val}
                        onChange={(e) => { this.setState({ val: e.currentTarget.value }) }} />
                    <span className="input-group-append">
                        <AsyncButton onClick={this.add} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faPlus} />
                        </AsyncButton>
                    </span>
                </span>
            </div>
        )
    }
}

export { IListItemAdder }
export default ListItemAdder