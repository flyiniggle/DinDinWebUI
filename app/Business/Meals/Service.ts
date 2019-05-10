import DinDinServiceConnector from 'Business/Services/DinDinServiceConnector';
import { DinDinServiceResponse } from 'Business/Services/Types/DinDinServiceResponse';
import Meal from 'Business/Meals/Types/Meal';
import { filter, isNil, map, not, pipe } from 'ramda';
import Message from "Business/Validation/Types/Message";
import APIMeal from 'Business/Meals/Types/APIMeal';
import INewMeal from 'Business/Meals/Types/NewMeal';


const MealsService = {
    get: function (): DinDinServiceResponse<Meal[], Message[]> {
        return DinDinServiceConnector.send('/meals/', {
            method: 'GET'
        }).then(map(map(formatMeal)));
    },
    patch: function (mealID: number, data: Partial<Meal>): DinDinServiceResponse<Meal, object> {
        return DinDinServiceConnector.send(`/meals/${mealID}/`, {
            method: 'PATCH',
            body: pipe(formatMealToAPI, JSON.stringify)(data)
        }).then(map(formatMeal));
    },
    post: function (meal: INewMeal): DinDinServiceResponse<Meal, object> {
        return DinDinServiceConnector.send('/meals/', {
            method: 'POST',
            body: pipe(formatMealToAPI, JSON.stringify)(meal)
        }).then(map(formatMeal)) as DinDinServiceResponse<Meal, object>;
    }
};

function formatMealToAPI({ id: pk, name, owner, taste, difficulty, lastUsed: last_used, usedCount: used_count, notes, ingredients, collaborators }: Partial<Meal>): APIMeal {
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

function formatMeal({ pk: id, name, owner, taste, difficulty, last_used: lastUsed, used_count: usedCount, notes, ingredients, collaborators }: APIMeal): Meal {
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