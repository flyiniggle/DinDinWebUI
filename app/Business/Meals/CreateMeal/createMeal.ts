import NewMeal from 'Business/Meals/Types/NewMeal';
import Meal from 'Business/Meals/Types/Meal';
import MealsService from '../Service';
import responseCheck from './Validation/responseCheck';
import Message from 'Business/Validation/Types/Message';
import { DinDinServiceResponse } from 'Business/Services/Types/DinDinServiceResponse';

async function createMeal(meal: NewMeal): DinDinServiceResponse<Meal, Message[]> {
    const result = await MealsService.post(meal);

    return result.mapErr(responseCheck);
}

export default createMeal;