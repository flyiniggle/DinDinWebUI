import * as React from 'react';
import { pipe } from 'ramda';
import { Result } from 'true-myth';
import IMeal from 'Business/Meals/Types/Meal';
import MealCard, { IMealCardProps } from './MealCard/MealCard';
import IDashboardViewProps from './Types/IDashboardViewProps';

function renderMealCards(props: Partial<IDashboardViewProps>): JSX.Element | JSX.Element[] {
    const {
        meals,
        filteredMeals,
        useMeal,
        mealIsUpdating,
        dashboardIsLoading
    } = props;
    const hasLoaded = dashboardIsLoading ? Result.err(<span>Loading...</span>) : Result.ok();
    const areMeals = Result.fromMaybe(<span>Oops! Something went wrong.</span>, meals);
    const areFilteredMeals = Result.fromMaybe(<span>Oops! Something went wrong.</span>, filteredMeals)
    
    return pipe(
        Result.and(areMeals),
        Result.chain((m: IMeal[]) => m.length > 0 ? Result.ok(m) : Result.err(<span>You haven't made any meals yet!</span>)),
        Result.and(areFilteredMeals),
        Result.chain((m: IMeal[]) => m.length > 0 ? Result.ok(m) : Result.err(<span>No meals matched your search.</span>)),
        Result.match({
            Ok: (m: IMeal[]) => m.map((meal) => {
                const mealCardProps: IMealCardProps = {
                    meal,
                    useMeal: useMeal,
                    mealIsUpdating: mealIsUpdating
                };
    
                return <MealCard key={meal.id} {...mealCardProps} />
            }),
            Err: (err) => err
        })
    )(hasLoaded);
}


export default renderMealCards;