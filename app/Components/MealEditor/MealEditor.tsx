import * as React from 'react';
import Message from 'Business/Validation/Types/Message';
import updateMeal from 'Business/Meals/updateMeal';
import IMeal from 'Business/Meals/Types/Meal';
import Meal from 'Components/Meal/Meal';
import { Result } from 'true-myth';
import editableFields from 'Components/Meal/editableFields';


interface State {
    activeField?: editableFields
    message?: Message
    activeFieldValue?: any
}

interface MealProps {
    meal?: IMeal,
    useMeal: (IMeal) => Promise<void>,
    updateMeal: (IMeal) => void
}


class MealEditor extends React.Component<MealProps, State> {
    readonly state: State = {
        message: null
    }

    save = async (prop: editableFields, val: any): Promise<Result<IMeal, Message[]>> => {
        const result = await updateMeal(this.props.meal, { [prop]: val });

        result.match({
            Ok: this.props.updateMeal,
            Err: console.log //use a generic error messager, just as soon as I build it
        });

        return result;
    }

    render() {
        const { meal, useMeal } = this.props;

        return (
            <Meal
                save={this.save}
                meal={meal}
                useMeal={useMeal}
            />
        );
    }
}

export default MealEditor;