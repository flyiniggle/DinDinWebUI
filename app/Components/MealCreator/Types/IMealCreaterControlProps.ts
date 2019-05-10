import Message from 'Business/Validation/Types/Message';
import INewMeal from 'Business/Meals/Types/NewMeal';
import { Maybe } from 'true-myth';
import editableFields from 'Components/Meal/Types/editableFields';


interface IMealCreatorControlProps {
    newMeal: INewMeal
    isWorking: boolean
    isSaved: boolean
    messages?: Maybe<Message[]>
    createMeal: (newMeal: INewMeal) => void
    updateMeal: (field: editableFields, value: any) => void
    acknowledgeMessage: (id: string) => void
}

export default IMealCreatorControlProps