import * as React from 'react';
import TextInput from 'UI/Forms/TextInput/TextInput';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';


interface NameEditorProps {
    name: string,
    onChange: (e: React.FormEvent) => void,
    onSave: () => void,
    onCancel: (e: Event) => void
}

function NameEditor(props: NameEditorProps) {
    return (
        <div className="input-group">
            <TextInput value={props.name} className="form-control-lg" onChange={props.onChange} />
            <div className="input-group-append">
                <AsyncButton onClick={props.onSave} className="name-editor-save btn btn-lg btn-primary">
                    <FontAwesomeIcon icon={faCheck} />
                </AsyncButton>
                <AsyncButton onClick={props.onCancel} className="name-editor-cancel btn btn-lg btn-outline-primary">
                    <FontAwesomeIcon icon={faBan} />
                </AsyncButton>
            </div>
        </div>
    );
}

export default NameEditor