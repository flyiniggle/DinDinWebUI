import InlineEditor from 'Components/Meal/InlineEditor/InlineEditor';
import IInlineEditorProps from 'Components/Meal/InlineEditor/Types/IInlineEditorProps';
import FieldControlDisplay from 'Components/Meal/InlineEditor/Types/FieldControlDisplay';
import EditName from './EditName';
import DisplayName from './DisplayName';


interface IDisplayOrEditNameProps extends IInlineEditorProps {
    displayValue: string
    editingValue: string
}

const DisplayOrEditName = InlineEditor(DisplayName, EditName, FieldControlDisplay.append);


export { IDisplayOrEditNameProps };
export default DisplayOrEditName;