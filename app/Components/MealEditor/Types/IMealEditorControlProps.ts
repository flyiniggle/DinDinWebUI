import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import { Maybe } from 'true-myth';


interface IMealEditorControlProps {
    meal: Maybe<IMeal>
    message?: Message
    useMeal: (IMeal: IMeal) => void
    updateMeal: (IMeal: IMeal, updates: Partial<IMeal>) => void
}

export default IMealEditorControlProps