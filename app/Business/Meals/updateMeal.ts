import Meal from "Business/Meals/Types/Meal";
import { mergeDeepLeft } from 'ramda';


function updateMeal(meal: Meal, updates: Partial<Meal>): Meal {
    return mergeDeepLeft(updates, meal)
}

export default updateMeal