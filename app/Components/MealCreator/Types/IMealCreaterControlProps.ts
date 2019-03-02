import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import INewMeal from 'Business/Meals/Types/NewMeal';
import { Maybe } from 'true-myth';


interface IMealCreatorControlProps {
    meal: IMeal | INewMeal
    isWorking: boolean
    messages?: Maybe<Message[]>
    createMeal: (newMeal: INewMeal) => void
}

export default IMealCreatorControlProps