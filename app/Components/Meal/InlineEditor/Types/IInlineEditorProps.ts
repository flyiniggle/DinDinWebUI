interface IInlineEditorProps {
    active: boolean
    activate: () => void
    onSave: () => void
    onCancel: (e: Event) => void
    onChange: any
    submitting?: boolean
    displayValue?: any
    editingValue?: any
}

export default IInlineEditorProps;