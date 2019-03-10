import Meal from "Business/Meals/Types/Meal";
import Message from 'Business/Validation/Types/Message';
import { mergeDeepLeft } from 'ramda';
import MealsService from '../Service';
import { Result } from 'true-myth';
import responseCheck from './Validation/responseCheck';


async function updateMeal(meal: Meal, updates: Partial<Meal>): Promise<Result<Meal, Message[]>> {
    const updatedMeal = mergeDeepLeft(updates, meal);
    const result = await MealsService.patch(meal.id, updatedMeal);
    
    return result.mapErr(responseCheck);
}

export default updateMeal