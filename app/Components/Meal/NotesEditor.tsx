import * as React from 'react';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

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
                <div className="float-right btn-group" role="group">
                    <AsyncButton className="btn btn-primary" onClick={this.doSave} working={this.state.submitting}>
                        <FontAwesomeIcon icon={faCheck} />
                    </AsyncButton>
                    <AsyncButton className="btn btn-outline-primary" onClick={this.props.onCancel}>
                        <FontAwesomeIcon icon={faBan} />
                    </AsyncButton>
                </div>
            </>
        )
    }
}

export default NotesEditor