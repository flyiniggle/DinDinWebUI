import { pipe } from 'ramda';
import { connect } from 'react-redux';
import MealView from 'Components/Meal/Meal';
import MealEditorControl from 'Components/MealEditor/MealEditorControl';
import { meal } from 'Data/Selectors/mealsSelectors';
import IMealEditorControlProps from './Types/IMealEditorControlProps';
import Meal from 'Business/Meals/Types/Meal';
import {
    acknowledgeMealEditorMessage,
    useMeal,
    updateMeal
} from 'Data/ActionCreators/mealEditorActionCreators';
import { isWorking, messages } from 'Data/Selectors/mealEditorSelectors';


const mapStateToProps = function (state, ownProps): Partial<IMealEditorControlProps> {
    return {
        meal: meal(state, ownProps.mealId),
        isWorking: isWorking(state),
        messages: messages(state)
    }
}

function mapDispatchToProps(dispatch): Partial<IMealEditorControlProps> {
    return {
        useMeal: pipe(useMeal, dispatch),
        updateMeal: function (meal: Meal, updates: Partial<Meal>): void {
            const action = updateMeal(meal, updates)

            dispatch(action)
        },
        acknowledgeMessage: pipe(acknowledgeMealEditorMessage, dispatch)
    }
}

const MealEditorProvider = connect(mapStateToProps, mapDispatchToProps);
const MealEditor = pipe(MealEditorControl, MealEditorProvider)(MealView) as React.FC<Partial<IMealEditorControlProps>>;

export default MealEditor;