import IMealsState from './IMealsState';
import IDashboardState from './IDashboardState';
import IMealCreatorState from './IMealCreatorState';
import IMealEditorState from './IMealEditorState';


interface RootState {
    meals: IMealsState
    dashboard: IDashboardState
    mealCreator: IMealCreatorState
    mealEditor: IMealEditorState
    responsive: object
    user: object
}


export default RootState