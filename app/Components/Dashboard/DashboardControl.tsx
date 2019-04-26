import * as React from 'react';
import { filter, identity, ifElse, lift, pipe } from 'ramda';
import IMeal from 'Business/Meals/Types/Meal';
import { IDashboardViewProps } from './DashboardView';
import { Maybe } from 'true-myth';
import findMeal from 'Business/Meals/findMeal';
import maybe from 'Business/Lib/maybe';


interface IDashboardControllerProps {
    meals: Maybe<IMeal[]>
    useMeal: () => void
    mealIsUpdating: boolean,
    mealsAreLoading: boolean
}

function DashboardControl(Dashboard) {
    return function DashboardController(props: IDashboardControllerProps) {
        const [searchString, setSearchString] = React.useState('');
        const maybeSearch: Maybe<(t: IMeal[]) => IMeal[]> = maybe(searchString).map(findMeal).map(filter);
        const meals: Maybe<IMeal[]> = pipe(
            Maybe.ap(maybeSearch),
            Maybe.or(props.meals)
        )(props.meals)
        const dashboardProps: IDashboardViewProps = {
            ...props,
            meals,
            searchString,
            updateSearchString: setSearchString,
        }

        return <Dashboard {...dashboardProps} />
    }
}

export default DashboardControl
