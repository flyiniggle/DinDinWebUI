import { pipe } from 'ramda';
import { connect } from 'react-redux';
import Meal from 'Components/Meal/Meal';
import MealEditorControl from 'Components/MealEditor/MealEditorControl';
import { useMeal, updateMeal } from 'Data/ActionCreators/mealActionCreators';
import { meal } from 'Data/Selectors/mealsSelectors';

const mapStateToProps = function (state, ownProps) {
    return {
        meal: meal(state, ownProps.mealId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        useMeal: pipe(useMeal, dispatch),
        updateMeal: pipe(updateMeal, dispatch)
    }
}

const MealEditorProvider = connect(mapStateToProps, mapDispatchToProps);
const MealEditor = pipe(MealEditorControl, MealEditorProvider)(Meal);

export default MealEditor;