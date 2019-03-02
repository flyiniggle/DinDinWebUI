import { pipe } from 'ramda';
import { connect } from 'react-redux';
import Meal from 'Components/Meal/Meal';
import MealEditorControl from 'Components/MealEditor/MealEditorControl';
import { useMeal, updateMeal } from 'Data/ActionCreators/mealsActionCreators';
import { meal, isWorking, messages } from 'Data/Selectors/mealsSelectors';
import IMealEditorControlProps from './Types/IMealEditorControlProps';
import IMeal from 'Business/Meals/Types/Meal';


const mapStateToProps = function (state, ownProps): Partial<IMealEditorControlProps> {
    return {
        meal: meal(state, ownProps.mealId),
        isWorking: isWorking(state),
        messages: messages(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        useMeal: pipe(useMeal, dispatch),
        updateMeal: function (meal: IMeal, updates: Partial<IMeal>): void {
            const action = updateMeal(meal, updates)

            dispatch(action)
        } 
    }
}

const MealEditorProvider = connect(mapStateToProps, mapDispatchToProps);
const MealEditor = pipe(MealEditorControl, MealEditorProvider)(Meal);

export default MealEditor;