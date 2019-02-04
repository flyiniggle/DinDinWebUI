import { pipe } from 'ramda';
import { connect } from 'react-redux';
import Meal from 'Components/Meal/Meal';
import MealEditorControl from 'Components/MealEditor/MealEditorControl';
import { useMeal as useMealActionCreator } from 'Data/ActionCreators/mealActionCreators';
import { meal } from 'Data/Selectors/mealsSelectors';

const mapStateToProps = function (state, ownProps) {
    return {
        meal: meal(state, ownProps.mealId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMeal: pipe(useMealActionCreator, dispatch)
    }
}

const MealEditorProvider = connect(mapStateToProps, mapDispatchToProps);
const MealEditor = pipe(MealEditorControl, MealEditorProvider)(Meal);

export default MealEditor;