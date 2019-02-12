interface IInlineEditorProps {
    active: boolean,
    activate: () => void,
    onSave: () => void,
    onCancel: (e: Event) => void,
    onChange: any,
    displayValue?: any,
    editingValue?: any
}

export default IInlineEditorProps;