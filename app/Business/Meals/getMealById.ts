import { curry } from 'ramda';
import Meal from 'Business/Meals/Types/Meal';

const getMealById = curry(function (id: number | string, meals: Array<Meal>): Meal {
    return meals.find(m => m.id.toString() === id.toString())
});

export default getMealById;
