import { pipe } from 'ramda';
import { connect } from 'react-redux';
import Meal from 'Components/Meal/Meal';
import MealEditorControl from 'Components/MealEditor/MealEditorControl';
import { meal } from 'Data/Selectors/mealsSelectors';

const mapStateToProps = function (state, ownProps) {
    console.log(ownProps)
    return {
        meal: meal(state, ownProps.mealId)
    }
}

const MealEditorProvider = connect(mapStateToProps, () => ({}));
const MealEditor = pipe(MealEditorControl, MealEditorProvider)(Meal);

export default MealEditor;