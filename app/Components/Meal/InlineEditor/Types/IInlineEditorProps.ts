interface IInlineEditorProps {
    active: boolean,
    activate: () => void,
    onSave: () => Promise<void>,
    onCancel: (e: Event) => void,
    onChange: any,
    displayValue: any,
    editingValue: any
}

export default IInlineEditorProps;