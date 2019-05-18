import { compose, pipe } from 'ramda';
import { connect } from 'react-redux'
import Meal from 'Components/Meal/Meal';
import MealCreatorControl from 'Components/MealCreator/MealCreatorControl';
import { createMeal, acknowledgeMessage, updateNewMeal } from 'Data/ActionCreators/mealCreatorActionCreators';
import IMealCreatorControlProps from './Types/IMealCreaterControlProps';
import { isLoading, messages, isSaved, newMeal } from 'Data/Selectors/mealCreatorSelectors';
import editableFields from 'Components/Meal/Types/editableFields';


const mapStateToProps = function (state): Partial<IMealCreatorControlProps> {
    return {
        isWorking: isLoading(state),
        isSaved: isSaved(state),
        messages: messages(state),
        newMeal: newMeal(state)
    }
}

function mapDispatchToProps(dispatch): Partial<IMealCreatorControlProps> {
    return {
        createMeal: pipe(createMeal, dispatch),
        updateMeal: (field: editableFields, value: any) => dispatch(updateNewMeal(field, value)),
        acknowledgeMessage: pipe(acknowledgeMessage, dispatch)
    }
}

const MealCreatorStoreConnector = connect(mapStateToProps, mapDispatchToProps);

const MealCreator = compose(
    MealCreatorStoreConnector,
    MealCreatorControl
)(Meal) as React.FC

export default MealCreator