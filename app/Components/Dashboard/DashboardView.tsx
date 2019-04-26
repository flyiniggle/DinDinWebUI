import * as React from 'react';
import { Link } from 'react-router-dom';
import { Maybe } from 'true-myth';
import Ribbon from 'Components/Ribbon/Ribbon';
import MealCard from 'Components/Dashboard/MealCard/MealCard';
import OverviewBase from 'Components/Dashboard/Overview/Overview';
import IMeal from 'Business/Meals/Types/Meal';
import TextInput, { ITextInputProps } from 'UI/Forms/TextInput/TextInput';

import 'Styles/theme.sass';
import './DashboardView.sass';


interface IDashboardViewProps {
    meals: Maybe<IMeal[]>
    searchString: string
    updateSearchString: (string) => void
}

function DashboardView(props) {
    const {
        meals,
        searchString,
        updateSearchString
    } = props;
    const inputProps: ITextInputProps = {
        placeholder: 'Search',
        value: searchString,
        onChange: (e) => { updateSearchString((e.target as HTMLInputElement).value) }
    }

    return (
        <div className="dashboard col-12 d-flex flex-column">
            <Ribbon>
                <Link to="meals/new" className="btn btn-sm btn-outline-accent">
                    new meal
                </Link>
                <TextInput {...inputProps} />
            </Ribbon>
            <div className="dashboard-main row d-flex flex-column flex-md-row flex-grow-1">
                <div className="d-none d-md-block col-12 col-md-4">
                    <div className="position-fixed">
                        <OverviewBase meals={meals.unwrapOr([])} />
                    </div>
                </div>
                <div className="meal-card-container col-12 col-md-8 p-md-5">
                    {
                        meals.match({
                            Just: (m) => m.map((meal) => (
                                <MealCard
                                    meal={meal}
                                    key={meal.id}
                                    useMeal={props.useMeal}
                                    mealIsUpdating={props.mealIsUpdating} />
                            )),
                            Nothing: () => <span>No meals</span>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export { IDashboardViewProps };
export default DashboardView;