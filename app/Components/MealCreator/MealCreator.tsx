import { compose, pipe } from 'ramda';
import { connect } from 'react-redux'
import Meal from 'Components/Meal/Meal';
import MealCreatorControl from 'Components/MealCreator/MealCreatorControl';
import { createMeal } from 'Data/ActionCreators/mealsActionCreators';
import IMealCreatorControlProps from './Types/IMealCreaterControlProps';
import { isWorking, messages } from 'Data/Selectors/mealsSelectors';


const mapStateToProps = function (state): Partial<IMealCreatorControlProps> {
    return {
        isWorking: isWorking(state),
        messages: messages(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createMeal: pipe(createMeal, dispatch),
    }
}

const MealCreatorStoreConnector = connect(mapStateToProps, mapDispatchToProps);

const MealCreator = compose(
    MealCreatorStoreConnector,
    MealCreatorControl
)(Meal)

export default MealCreator