import InlineEditor, {IInlineEditorProps} from 'Components/Meal/InlineEditor';
import EditTaste from 'Components/Meal/DisplayOrEditTaste/EditTaste';
import DisplayTaste from 'Components/Meal/DisplayOrEditTaste/DisplayTaste';


interface IDisplayOrEditTasteProps extends IInlineEditorProps {
    displayValue: number
    editingValue: number,
    range: number
}

const DisplayOrEditTaste = InlineEditor(DisplayTaste, EditTaste)


export { IDisplayOrEditTasteProps };
export default DisplayOrEditTaste;