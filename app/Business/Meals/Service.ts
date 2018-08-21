import DinDinService from 'Business/Services/DinDinService';
import Meal from 'Business/Meals/Types/Meal';
import { map } from 'ramda';
import { Result } from "true-myth";
import Message from "Business/Validation/Types/Message";


const MealsService = {
    get: function(): Promise<Result<Meal[], Message[]>> {
        return DinDinService.send('/meals/', {
            method: 'GET'
        }).then(map(map(formatMeal)));
    }
};

function formatMeal({pk: id, name, owner, taste, difficulty, last_used: lastUsed, used_count: usedCount, notes}): Meal {
    return {
        id: id,
        name: name,
        owner: owner,
        taste: taste,
        difficulty: difficulty,
        lastUsed: lastUsed,
        usedCount: usedCount,
        notes: notes
    }
}

export default MealsService;
export { formatMeal }