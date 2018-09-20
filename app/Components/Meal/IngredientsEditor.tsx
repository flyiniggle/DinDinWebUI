import * as React from 'react';
import EditableList, { IEditableListProps } from 'UI/Forms/EditableList/EditableList';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

interface IIngredientsEditorProps extends IEditableListProps {
    onSave: () => void,
    onCancel: (e: Event) => void
}

interface State {
    submitting: boolean
}

class IngredientsEditor extends React.Component<IIngredientsEditorProps, State> {
    readonly state: State = {
        submitting: false
    }

    doSave = async (): Promise<void> => {
        this.setState({ submitting: true });
        await this.props.onSave();
        this.setState({ submitting: false });
    }

    render() {
        const { onSave, onCancel, ...rest } = this.props;
        return (
            <React.Fragment>
                <EditableList {...rest} />
                <div className="float-right btn-group" role="group">
                    <AsyncButton className="btn btn-primary" onClick={this.doSave} working={this.state.submitting}>
                        <FontAwesomeIcon icon={faCheck} />
                    </AsyncButton>
                    <AsyncButton className="btn btn-outline-primary" onClick={this.props.onCancel}>
                        <FontAwesomeIcon icon={faBan} />
                    </AsyncButton>
                </div>
            </React.Fragment>
        )
    }
}

export default IngredientsEditor