import * as React from 'react';
import FieldControlButtons from 'UI/Forms/FieldControlButtons/FieldControlButtons';
import IInlineEditorProps from './Types/IInlineEditorProps';
import FieldControlDisplay from './Types/FieldControlDisplay'


interface IState {
    submitting: boolean
}

function InlineEditor(
    Display,
    Editor,
    fieldControlDisplay: FieldControlDisplay = FieldControlDisplay.append
): React.ComponentClass<IInlineEditorProps, IState> {
    return class InlineEditor extends React.Component<IInlineEditorProps, IState> {

        componentWillMount = function() {
            document.addEventListener('keydown', this.handleKeydown, false);
        }

        componentWillUnmount = function() {
            document.removeEventListener('keydown', this.handleKeydown, false);
        }

        handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                this.props.onSave();
            } else if (e.key === 'Escape') {
                this.props.onCancel(e);
            }
        }

        render() {
            const { active, activate, onCancel, onChange, displayValue, editingValue, submitting, ...rest } = this.props;
            return (
                <div className='inline-editor'>
                    {!active &&
                        <div className="editable" onClick={activate}>
                            <Display value={displayValue} {...rest}/>
                        </div>}
                    {active && renderControls(Editor,
                        fieldControlDisplay,
                        { onChange, value: editingValue, ...rest },
                        { doSave: this.props.onSave, doCancel: onCancel, submitting: submitting }
                    )}
                </div>
            )
        }
    }
}

function renderControls(Editor, display: FieldControlDisplay, editorProps, buttonsProps) {
    switch (display) {
        case FieldControlDisplay.append:
            return (
                <div className="input-group pb-2">
                    <Editor {...editorProps } />
                    <FieldControlButtons append {...buttonsProps} />
                </div>
            );
        case FieldControlDisplay.inline:
            return (
                <div className="input-group pb-2">
                    <div className="pr-4">
                        <Editor {...editorProps} />
                    </div>
                    <FieldControlButtons {...buttonsProps} className="btn-sm"/>
                </div>
            );
        case FieldControlDisplay.block:
            return (
                <div>
                    <Editor {...editorProps } />
                    <FieldControlButtons {...buttonsProps} />
                </div>
            );
    }
}

export default InlineEditor;