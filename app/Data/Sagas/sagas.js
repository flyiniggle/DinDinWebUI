import { watchGetMeals, watchUseMeal } from 'Data/Sagas/mealsSagas';

import { all } from 'redux-saga/effects';


function* rootSaga() {
    yield all([
        watchGetMeals(),
        watchUseMeal()
    ]);
}

export default rootSaga;