import IAsyncViewState from './IAsyncViewState';
import INewMeal from 'Business/Meals/Types/INewMeal';

export default interface IMealCreatorState extends IAsyncViewState { 
    isSaved: boolean,
    newMeal: INewMeal
}