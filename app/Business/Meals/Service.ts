import DinDinService from 'Business/Services/DinDinService';
import IMeal from 'Business/Meals/Types/Meal';
import { filter, isNil, map, not, pipe } from 'ramda';
import { Result } from "true-myth";
import Message from "Business/Validation/Types/Message";
import APIMeal from 'Business/Meals/Types/APIMeal';
import INewMeal from 'Business/Meals/Types/INewMeal';


const MealsService = {
    get: function (): Promise<Result<IMeal[], Message[]>> {
        return DinDinService.send('/meals/', {
            method: 'GET'
        }).then(map(map(formatMeal)));
    },
    patch: function (mealID: number, data: Partial<IMeal>): Promise<Result<IMeal, object>> {
        return DinDinService.send(`/meals/${mealID}/`, {
            method: 'PATCH',
            body: pipe(formatMealToAPI, JSON.stringify)(data)
        }).then(map(formatMeal));
    },
    post: function (meal: INewMeal): Promise<Result<IMeal, object>> {
        return DinDinService.send('/meals/', {
            method: 'POST',
            body: pipe(formatMealToAPI, JSON.stringify)(meal)
        }).then(map(formatMeal));
    }
};

function formatMealToAPI({ id: pk, name, owner, taste, difficulty, lastUsed: last_used, usedCount: used_count, notes, ingredients, collaborators }: Partial<IMeal>): APIMeal {
    return filter(pipe(isNil, not), {
        pk,
        name,
        owner,
        taste,
        difficulty,
        last_used,
        used_count,
        notes,
        ingredients,
        collaborators
    })
}

function formatMeal({ pk: id, name, owner, taste, difficulty, last_used: lastUsed, used_count: usedCount, notes, ingredients, collaborators }: APIMeal): IMeal {
    return {
        id,
        name,
        owner,
        taste,
        difficulty,
        lastUsed,
        usedCount,
        notes,
        ingredients,
        collaborators
    }
}

export default MealsService;
export { formatMeal, formatMealToAPI }