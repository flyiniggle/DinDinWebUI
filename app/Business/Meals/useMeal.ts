import Meal from 'Business/Meals/Types/Meal';
import { evolve, inc, pick, pipe } from 'ramda';
import dateString from 'DinDin/UI/Formatting/dateString';


const useMeal: (meal: Meal) => Partial<Meal> = pipe(
    pick(['lastUsed', 'usedCount']),
    evolve({
        usedCount: inc,
        lastUsed: () => dateString.store(new Date())
    })
);


export default useMeal;