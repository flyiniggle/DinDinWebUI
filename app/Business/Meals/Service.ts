import DinDinService from 'Business/Services/DinDinService';
import Meal from 'Business/Meals/Types/Meal';
import { filter, isNil, map, not, pipe } from 'ramda';
import { Result } from "true-myth";
import Message from "Business/Validation/Types/Message";
import APIMeal from 'Business/Meals/Types/APIMeal';


const MealsService = {
    get: function (): Promise<Result<Meal[], Message[]>> {
        return DinDinService.send('/meals/', {
            method: 'GET'
        }).then(map(map(formatMeal)));
    },
    patch: function (mealID: number, data: object): Promise<Result<Meal, Message[]>> {
        return DinDinService.send(`/meals/${mealID}/`, {
            method: 'PATCH',
            body: pipe(formatMealToAPI, JSON.stringify)(data)
        }).then(map(formatMeal));
    }
};

function formatMealToAPI({ id: pk, name, owner, taste, difficulty, lastUsed: last_used, usedCount: used_count, notes }: Meal): APIMeal {
    return filter(pipe(isNil, not), {
        pk,
        name,
        owner,
        taste,
        difficulty,
        last_used,
        used_count,
        notes
    })
}

function formatMeal({ pk: id, name, owner, taste, difficulty, last_used: lastUsed, used_count: usedCount, notes }: APIMeal): Meal {
    return {
        id,
        name,
        owner,
        taste,
        difficulty,
        lastUsed,
        usedCount,
        notes
    }
}

export default MealsService;
export { formatMeal, formatMealToAPI }