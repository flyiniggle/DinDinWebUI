import * as React from 'react';
import Meal from 'Components/Meal/Meal';
import editableFields from 'Components/Meal/editableFields';
import { Result } from 'true-myth';
import IMeal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';
import INewMeal from 'Business/Meals/Types/NewMeal';
import createMeal from 'Business/Meals/createMeal';

interface State {
    meal: INewMeal
    message?: Message
}

interface IMealCreatorProps {
    addMeal: (INewMeal) => Promise<Result<Meal, Message[]>>
}

class MealCreator extends React.Component<IMealCreatorProps, State> {
    readonly state: State = {
        meal: {
            name: '',
            ingredients: [],
            taste: 0,
            difficulty: 0,
            notes: '',
        },
        message: null
    }

    save = async (): Promise<Result<IMeal, Message[]>> => {
        const result = await createMeal(this.state.meal);

        result.match({
            Ok: () => null,
            Err: console.log //use a generic error messager, just as soon as I build it
        });

        return result;
    }

    render() {
        return (
            <span>heyo</span>
        )
    }
}

export default MealCreator