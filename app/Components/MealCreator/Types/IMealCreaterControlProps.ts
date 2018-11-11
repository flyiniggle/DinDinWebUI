import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import editableFields from 'Components/Meal/editableFields';
import { Result } from 'true-myth';


interface IMealCreatorControlProps {
    meal: IMeal | INewMeal
    message?: Message
    save: (string: editableFields, val: any) => Promise<Result<IMeal, Message[]>>
}

export default IMealCreatorControlProps