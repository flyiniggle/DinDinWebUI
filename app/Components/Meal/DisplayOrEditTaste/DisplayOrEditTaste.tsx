import InlineEditor from 'Components/Meal/InlineEditor/InlineEditor';
import IInlineEditorProps from 'Components/Meal/InlineEditor/Types/IInlineEditorProps';
import FieldControlDisplay from 'Components/Meal/InlineEditor/Types/FieldControlDisplay';
import EditTaste from 'Components/Meal/DisplayOrEditTaste/EditTaste';
import DisplayTaste from 'Components/Meal/DisplayOrEditTaste/DisplayTaste';


interface IDisplayOrEditTasteProps extends IInlineEditorProps {
    displayValue: number
    editingValue: number,
    range: number
}

const DisplayOrEditTaste = InlineEditor(DisplayTaste, EditTaste, FieldControlDisplay.inline);


export { IDisplayOrEditTasteProps };
export default DisplayOrEditTaste;