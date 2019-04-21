import IMeal from "Business/Meals/Types/Meal";

function findMeal(parameter: string, meal: IMeal): boolean {
    const tester = new RegExp(parameter, 'ig');
    if (tester.test(meal.name)) {
        return true
    }
    if (meal.ingredients.find(ing => tester.test(ing)) !== undefined) {
        return true
    }
    return false
}

export default findMeal