import InlineEditor from 'Components/Meal/InlineEditor/InlineEditor';
import IInlineEditorProps from 'Components/Meal/InlineEditor/Types/IInlineEditorProps';
import FieldControlDisplay from 'Components/Meal/InlineEditor/Types/FieldControlDisplay';
import EditIngredients from './EditIngredients';
import DisplayIngredients from './DisplayIngredients';


interface IDisplayOrEditIngredientsProps extends IInlineEditorProps {
    displayValue?: Array<string>
    editingValue: Array<string>
}

const DisplayOrEditIngredients = InlineEditor(DisplayIngredients, EditIngredients, FieldControlDisplay.block);


export { IDisplayOrEditIngredientsProps };
export default DisplayOrEditIngredients;