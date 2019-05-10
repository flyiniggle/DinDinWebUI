import Meal from "Business/Meals/Types/Meal";
import IAsyncViewState from './IAsyncViewState';

export default interface IMealsState extends IAsyncViewState {
    meals: Meal[] | null,
    isWorking: boolean
}