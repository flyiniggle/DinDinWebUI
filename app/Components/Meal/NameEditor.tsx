import * as React from 'react';
import TextInput from 'UI/Forms/TextInput/TextInput';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';


interface INameEditorProps {
    name: string,
    onChange: (e: React.FormEvent) => void,
    onSave: () => Promise<void>,
    onCancel: (e: Event) => void
}

interface IState {
    submitting: boolean
}

class NameEditor extends React.Component<INameEditorProps, IState> {
    readonly state: IState = {
        submitting: false
    }

    doSave = async (): Promise<void> => {
        this.setState({ submitting: true });
        await this.props.onSave();
        this.setState({ submitting: false });
    }

    render() {
        return (
            <div className="input-group pb-2">
                <TextInput value={this.props.name} className="form-control-lg" onChange={this.props.onChange} />
                <FieldControlButtons
                    append
                    doSave={this.doSave}
                    doCancel={this.props.onCancel}
                    submitting={this.state.submitting} />
            </div>
        );
    }
}

export default NameEditor