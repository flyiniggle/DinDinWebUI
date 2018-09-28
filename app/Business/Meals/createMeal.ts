import INewMeal from "Business/Meals/Types/NewMeal";
import { Result } from "true-myth";
import Message from "Business/Validation/Types/Message";
import MealsService from "Business/Meals/Service";
import IMeal from "Business/Meals/Types/Meal";

async function createMeal(newMeal: INewMeal): Promise<Result<IMeal, Message[]>> {
    //TODO: OMG VALIDATE
    return await MealsService.post(newMeal);
}

export default createMeal;