import Message from 'Business/Validation/Types/Message';
import Meal from 'Business/Meals/Types/Meal';
import { Maybe } from 'true-myth';


interface IMealEditorControlProps {
    meal: Maybe<Meal>,
    isWorking: boolean
    messages: Maybe<Message[]>
    useMeal: (IMeal: Meal) => void
    updateMeal: (IMeal: Meal, updates: Partial<Meal>) => void,
    acknowledgeMessage: (id: string) => void
}

export default IMealEditorControlProps