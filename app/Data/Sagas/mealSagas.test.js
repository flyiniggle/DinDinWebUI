import { updateMeal } from './mealsSagas';

describe('mealSagas', function() {
    describe('updateMeal', function() {
        it('should do something.', function() {
            const mealUpdater = updateMeal({ meal: {}});

            console.log(mealUpdater.next().value);
        });
    });
});