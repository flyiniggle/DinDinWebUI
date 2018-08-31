import Meal from 'Business/Meals/Types/Meal';
import MealsService from 'Business/Meals/Service';
import { evolve, inc, pick, pipe } from 'ramda';
import { Result } from 'true-myth';
import dateString from 'DinDin/UI/Formatting/dateString';

function useMeal(meal: Meal): Promise<Result<Meal, any>> {
    const updatedMeal = pipe(
        pick(['lastUsed', 'usedCount']),
        evolve({
            usedCount: inc,
            lastUsed: () => dateString.store(new Date())
        })
    )(meal);

    return MealsService.patch(meal.id, updatedMeal);
}

export default useMeal;