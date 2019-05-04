import InlineEditor from 'Components/Meal/InlineEditor/InlineEditor';
import IInlineEditorProps from 'Components/Meal/InlineEditor/Types/IInlineEditorProps';
import FieldControlDisplay from 'Components/Meal/InlineEditor/Types/FieldControlDisplay';
import IUser from 'Business/Auth/Types/User';
import DisplayCollaborators from './DisplayCollaborators';
import EditCollaborators from './EditCollaborators';


interface IDisplayOrEditCollaboratorsProps extends IInlineEditorProps {
    collaborators: IUser[]
    users: IUser[]
}

const DisplayOrEditCollaborators = InlineEditor(DisplayCollaborators, EditCollaborators, FieldControlDisplay.block);


export { IDisplayOrEditCollaboratorsProps };
export default DisplayOrEditCollaborators;