import * as React from 'react';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';

interface NotesEditorState {
    submitting: boolean
}

interface NotesEditorProps {
    notes?: string,
    onChange: (e: React.FormEvent) => void,
    onSave: () => Promise<void>,
    onCancel: (e: Event) => void
}

class NotesEditor extends React.Component<NotesEditorProps, NotesEditorState> {
    readonly state: NotesEditorState = {
        submitting: false
    }

    doSave = async (): Promise<void> => {
        this.setState({ submitting: true });
        await this.props.onSave();
        this.setState({ submitting: false });
    }

    render() {
        return (
            <>
                <textarea className="form-control d-block mb-2" onChange={this.props.onChange} value={this.props.notes} />
                <FieldControlButtons
                    doSave={this.doSave}
                    doCancel={this.props.onCancel}
                    submitting={this.state.submitting} />
            </>
        )
    }
}

export default NotesEditor