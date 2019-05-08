import { Maybe } from "true-myth";
import Meal from "Business/Meals/Types/Meal";


export default interface IDashboardViewProps {
    meals: Maybe<Meal[]>
    filteredMeals: Maybe<Meal[]>
    searchString: string
    useMeal: (meal: Meal) => void
    updateSearchString: (string) => void
    mealIsUpdating: boolean,
    dashboardIsLoading: boolean
}