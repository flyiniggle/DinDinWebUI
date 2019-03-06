import INewMeal from './Types/NewMeal';
import IMeal from './Types/Meal';
import MealsService from './Service';
import responseCheck from './Validation/MealCreator/responseCheck';
import { Result } from 'true-myth';
import Message from 'Business/Validation/Types/Message';

async function createMeal(meal: INewMeal): Promise<Result<IMeal, Message[]>> {
    const result = await MealsService.post(meal);

    return result.mapErr(responseCheck);
}

export default createMeal;