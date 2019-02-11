import { watchGetMeals, watchUseMeal, watchUpdateMeal } from 'Data/Sagas/mealsSagas';

import { all } from 'redux-saga/effects';


function* rootSaga() {
    yield all([
        watchGetMeals(),
        watchUseMeal(),
        watchUpdateMeal()
    ]);
}

export default rootSaga;