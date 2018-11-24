import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import editableFields from 'Components/Meal/Types/editableFields';
import { Result } from 'true-myth';


interface IMealEditorControlProps {
    meal: IMeal | INewMeal
    message?: Message
    useMeal: (IMeal: IMeal) => Promise<void>
    updateMeal: (IMeal: IMeal) => void
}

export default IMealEditorControlProps