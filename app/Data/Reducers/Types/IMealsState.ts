import IMeal from "Business/Meals/Types/Meal";
import Message from "Business/Validation/Types/Message";

export default interface IMealsState {
    meals: IMeal[] | null
    saveMealInProgress: boolean
    messages: Message[] | null
}