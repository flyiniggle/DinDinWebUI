import { watchGetMeals } from 'Data/Sagas/mealsSagas';

import { all } from 'redux-saga/effects';


function* rootSaga() {
    yield all([
        watchGetMeals()
    ]);
}

export default rootSaga;