import * as React from 'react';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';


/* function InlineEditor(
    Display: React.Component<any, any> | ((props: object) => JSX.Element),
    Editor: React.Component<any, any> | ((props: object) => JSX.Element),
    propName: editableFields,
    value: any
): React.ComponentClass {
    return class InlineEditor extends React.Component {

    }
} */

interface IState {
    submitting: boolean
}

interface InlineEditorProps {
    active: boolean,
    activate: () => void,
    onSave: () => Promise<void>,
    onCancel: (e: Event) => void,
    onChange: any,
    displayValue: any,
    editingValue: any,
}

function InlineEditor(
    Display,
    Editor,
): React.ComponentClass<InlineEditorProps, IState> {
    return class InlineEditor extends React.Component<InlineEditorProps, IState> {
        readonly state: IState = {
            submitting: false
        }

        componentWillMount = function() {
            document.addEventListener('keydown', this.handleKeydown, false);
        }
    
        componentWillUnmount = function() {
            document.removeEventListener('keydown', this.handleKeydown, false);
        }

        handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                this.doSave();
            }
        }

        doSave = async (): Promise<void> => {
            this.setState({ submitting: true });
            await this.props.onSave();
            this.setState({ submitting: false });
        }

        render() {
            const { active, activate, onCancel, onChange, displayValue, editingValue, ...rest } = this.props;
            return (
                <div className='inline-editor'>
                    {!active &&
                        <div className="editable" onClick={activate}>
                            <Display value={displayValue} />
                        </div>}
                    {active &&
                        <div className="input-group pb-2">
                            <Editor {...{ onChange, value: editingValue, ...rest }} />
                            <FieldControlButtons
                                append
                                doSave={this.doSave}
                                doCancel={onCancel}
                                submitting={this.state.submitting} />
                        </div>
                    }
                </div>
            )
        }
    }
}

export default InlineEditor