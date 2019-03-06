import { compose, pipe } from 'ramda';
import { connect } from 'react-redux'
import Meal from 'Components/Meal/Meal';
import MealCreatorControl from 'Components/MealCreator/MealCreatorControl';
import { createMeal, acknowledgeMessage } from 'Data/ActionCreators/mealCreatorActionCreators';
import IMealCreatorControlProps from './Types/IMealCreaterControlProps';
import { isLoading, messages } from 'Data/Selectors/mealCreatorSelectors';


const mapStateToProps = function (state): Partial<IMealCreatorControlProps> {
    return {
        isWorking: isLoading(state),
        messages: messages(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createMeal: pipe(createMeal, dispatch),
        acknowledgeMessage: pipe(acknowledgeMessage, dispatch)
    }
}

const MealCreatorStoreConnector = connect(mapStateToProps, mapDispatchToProps);

const MealCreator = compose(
    MealCreatorStoreConnector,
    MealCreatorControl
)(Meal)

export default MealCreator