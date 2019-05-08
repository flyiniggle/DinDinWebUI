import Meal from "Business/Meals/Types/Meal";
import { curry } from 'ramda';


const findMeal = curry(function (parameter: string, meal: Meal): boolean {
    const tester = new RegExp(parameter, 'ig');
    if (tester.test(meal.name)) {
        return true
    }
    if (meal.ingredients.find(ing => tester.test(ing)) !== undefined) {
        return true
    }
    return false
});

export default findMeal