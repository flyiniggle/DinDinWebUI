import IAsyncViewState from './IAsyncViewState';
import INewMeal from 'Business/Meals/Types/NewMeal';

export default interface IMealCreatorState extends IAsyncViewState { 
    isSaved: boolean,
    newMeal: INewMeal
}