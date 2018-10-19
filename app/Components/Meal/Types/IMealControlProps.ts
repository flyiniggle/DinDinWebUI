import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import editableFields from 'Components/Meal/editableFields';
import { Result } from 'true-myth';


interface IMealControlProps {
    meal: IMeal | INewMeal
    message?: Message
    useMeal?: (IMeal) => Promise<void>
    save: (string: editableFields, val: any) => Promise<Result<IMeal, Message[]>>
}

export default IMealControlProps