import InlineEditor from 'Components/Meal/InlineEditor/InlineEditor';
import IInlineEditorProps from 'Components/Meal/InlineEditor/Types/IInlineEditorProps';
import FieldControlDisplay from 'Components/Meal/InlineEditor/Types/FieldControlDisplay';
import EditNotes from './EditNotes';
import DisplayNotes from './DisplayNotes';


interface IDisplayOrEditNotesProps extends IInlineEditorProps {
    displayValue: string
    editingValue: string
}

const DisplayOrEditNotes = InlineEditor(DisplayNotes, EditNotes, FieldControlDisplay.block);


export { IDisplayOrEditNotesProps };
export default DisplayOrEditNotes;