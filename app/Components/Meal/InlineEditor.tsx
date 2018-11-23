import * as React from 'react';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';


interface IState {
    submitting: boolean
}

interface IInlineEditorProps {
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
): React.ComponentClass<IInlineEditorProps, IState> {
    return class InlineEditor extends React.Component<IInlineEditorProps, IState> {
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
            } else if (e.key === 'Escape') {
                this.props.onCancel(e);
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
                            <Display value={displayValue} {...rest}/>
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

export { IInlineEditorProps };
export default InlineEditor;