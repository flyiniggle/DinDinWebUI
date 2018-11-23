import InlineEditor from 'Components/Meal/InlineEditor/InlineEditor';
import IInlineEditorProps from 'Components/Meal/InlineEditor/Types/IInlineEditorProps';
import FieldControlDisplay from 'Components/Meal/InlineEditor/Types/FieldControlDisplay';
import EditDifficulty from 'Components/Meal/DisplayOrEditDifficulty/EditDifficulty';
import DisplayDifficulty from 'Components/Meal/DisplayOrEditDifficulty/DisplayDifficulty';


interface IDisplayOrEditDifficultyProps extends IInlineEditorProps {
    displayValue: number
    editingValue: number,
    range: number
}

const DisplayOrEditDifficulty = InlineEditor(DisplayDifficulty, EditDifficulty, FieldControlDisplay.inline);


export { IDisplayOrEditDifficultyProps };
export default DisplayOrEditDifficulty;