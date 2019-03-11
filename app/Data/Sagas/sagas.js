import { watchGetMeals } from 'Data/Sagas/dinDinSagas';
import { watchCreateMeal } from 'Data/Sagas/mealCreatorSagas';
import { watchUseMeal as mealEditorWatchUseMeal, watchUpdateMeal } from 'Data/Sagas/mealEditorSagas';
import { watchUseMeal as dashboardWatchUseMeal } from 'Data/Sagas/dashboardSagas';

import { all } from 'redux-saga/effects';


function* rootSaga() {
    yield all([
        watchGetMeals(),
        dashboardWatchUseMeal(),
        watchCreateMeal(),
        mealEditorWatchUseMeal(),
        watchUpdateMeal()
    ]);
}

export default rootSaga;