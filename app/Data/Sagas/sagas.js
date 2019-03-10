import { watchGetMeals, watchUseMeal } from 'Data/Sagas/dinDinSagas';
import { watchCreateMeal } from 'Data/Sagas/mealCreatorSagas';
import { watchUseMeal as mealEditorWatchUseMeal, watchUpdateMeal } from 'Data/Sagas/mealEditorSagas';

import { all } from 'redux-saga/effects';


function* rootSaga() {
    yield all([
        watchGetMeals(),
        watchUseMeal(),
        watchCreateMeal(),
        mealEditorWatchUseMeal(),
        watchUpdateMeal()
    ]);
}

export default rootSaga;