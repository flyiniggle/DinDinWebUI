import IMeal from "Business/Meals/Types/Meal";
import IAsyncViewState from './IAsyncViewState';

export default interface IMealsState extends IAsyncViewState {
    meals: IMeal[] | null,
    isWorking: boolean
}