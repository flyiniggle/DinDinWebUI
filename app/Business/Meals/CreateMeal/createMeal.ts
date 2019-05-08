import INewMeal from '../Types/NewMeal';
import Meal from '../Types/Meal';
import MealsService from '../Service';
import responseCheck from './Validation/responseCheck';
import Message from 'Business/Validation/Types/Message';
import { DinDinServiceResponse } from 'Business/Services/Types/DinDinServiceResponse';

async function createMeal(meal: INewMeal): DinDinServiceResponse<Meal, Message[]> {
    const result = await MealsService.post(meal);

    return result.mapErr(responseCheck);
}

export default createMeal;