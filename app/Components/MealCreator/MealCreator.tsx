import * as React from 'react';
import Meal from 'Components/Meal/Meal';
import { Result } from 'true-myth';
import IMeal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';
import INewMeal from 'Business/Meals/Types/NewMeal';
import createMeal from 'Business/Meals/createMeal';

interface State {
    meal: INewMeal,
    created: boolean,
    mealId?: number,
    message?: Message
}

interface IMealCreatorProps {
    addMeal: (INewMeal) => Promise<Result<IMeal, Message[]>>
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
        created: false,
        mealId: null,
        message: null
    }

    save = async (): Promise<Result<IMeal, Message[]>> => {
        const result = await createMeal(this.state.meal);

        result.map((meal) => {
            this.setState({
                created: true,
                mealId: meal.id
            });
        })

        result.match({
            Ok: () => null,
            Err: console.log //use a generic error messager, just as soon as I build it
        });

        return result;
    }

    render() {
        return (
            <Meal
                meal={this.state.meal}
                save={this.save}
                />
        )
    }
}

export default MealCreator