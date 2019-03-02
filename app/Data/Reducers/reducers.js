import { combineReducers } from 'redux';
import dashboard from 'Data/Reducers/dashboardReducer';
import mealCreator from 'Data/Reducers/mealCreatorReducer';
import mealEditor from 'Data/Reducers/mealEditorReducer';
import meals from 'Data/Reducers/mealsReducer';
import user from 'Data/Reducers/userReducer';


export const reducers = combineReducers({
    dashboard,
    mealCreator,
    mealEditor,
    meals,
    user
});


export default reducers;