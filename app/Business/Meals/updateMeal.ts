import Meal from "Business/Meals/Types/Meal";
import MealsService from "Business/Meals/Service";
import { mergeDeepLeft } from 'ramda';

interface IUpdateMeal {
    meal: Meal
    updates: object
}

function updateMeal(meal, updates) {
    const updatedMeal: Meal = mergeDeepLeft(updates, meal);

    return MealsService.patch(meal.id, updatedMeal);
}

export default updateMeal