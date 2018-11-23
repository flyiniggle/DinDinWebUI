import InlineEditor, {IInlineEditorProps} from 'Components/Meal/InlineEditor';
import EditDifficulty from 'Components/Meal/DisplayOrEditDifficulty/EditDifficulty';
import DisplayDifficulty from 'Components/Meal/DisplayOrEditDifficulty/DisplayDifficulty';


interface IDisplayOrEditDifficultyProps extends IInlineEditorProps {
    displayValue: number
    editingValue: number,
    range: number
}

const DisplayOrEditDifficulty = InlineEditor(DisplayDifficulty, EditDifficulty)


export { IDisplayOrEditDifficultyProps };
export default DisplayOrEditDifficulty;