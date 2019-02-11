import { compose, pipe } from 'ramda';
import { connect } from 'react-redux'
import Meal from 'Components/Meal/Meal';
import MealCreatorControl from 'Components/MealCreator/MealCreatorControl';
import { updateMeal } from 'Data/ActionCreators/mealActionCreators';


function mapDispatchToProps(dispatch) {
    return {
        updateMeal: pipe(updateMeal, dispatch)
    }
}

const MealCardStoreConnector = connect(() => ({}), mapDispatchToProps);

const MealCreator = compose(
    MealCardStoreConnector,
    MealCreatorControl
)(Meal)

export default MealCreator