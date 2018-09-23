import * as React from 'react';
import EditableList, { IEditableListProps } from 'UI/Forms/EditableList/EditableList';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';

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
        const { onCancel, ...rest } = this.props;
        return (
            <React.Fragment>
                <EditableList {...rest} className="mb-3" />
                <FieldControlButtons
                    doSave={this.doSave}
                    doCancel={onCancel}
                    submitting={this.state.submitting} />
            </React.Fragment>
        )
    }
}

export default IngredientsEditor