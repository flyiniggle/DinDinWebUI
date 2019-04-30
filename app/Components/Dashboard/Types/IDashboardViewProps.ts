import { Maybe } from "true-myth";
import IMeal from "Business/Meals/Types/Meal";


export default interface IDashboardViewProps {
    meals: Maybe<IMeal[]>
    filteredMeals: Maybe<IMeal[]>
    searchString: string
    useMeal: (meal: IMeal) => void
    updateSearchString: (string) => void
    mealIsUpdating: boolean,
    dashboardIsLoading: boolean
}