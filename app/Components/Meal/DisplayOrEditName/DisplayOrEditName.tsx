import InlineEditor, {IInlineEditorProps} from 'Components/Meal/InlineEditor';
import EditName from './EditName';
import DisplayName from './DisplayName';


interface IDisplayOrEditNameProps extends IInlineEditorProps {
    displayValue: string
    editingValue: string
}

const DisplayOrEditName = InlineEditor(DisplayName, EditName)


export { IDisplayOrEditNameProps };
export default DisplayOrEditName;