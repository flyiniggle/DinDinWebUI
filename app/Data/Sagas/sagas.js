import { watchGetMeals, watchUseMeal, watchUpdateMeal } from 'Data/Sagas/mealsSagas';
import { watchCreateMeal } from 'Data/Sagas/mealCreatorSagas';

import { all } from 'redux-saga/effects';


function* rootSaga() {
    yield all([
        watchGetMeals(),
        watchUseMeal(),
        watchUpdateMeal(),
        watchCreateMeal()
    ]);
}

export default rootSaga;