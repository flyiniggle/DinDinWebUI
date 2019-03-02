import { watchGetMeals, watchUseMeal, watchUpdateMeal, watchCreateMeal } from 'Data/Sagas/mealsSagas';

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