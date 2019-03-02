import { curry } from 'ramda';
import IMeal from 'Business/Meals/Types/Meal';

const getMealById = curry(function (id: number | string, meals: Array<IMeal>): IMeal {
    return meals.find(m => m.id.toString() === id.toString())
});

export default getMealById;
