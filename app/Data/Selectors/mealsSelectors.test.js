import * as selectors from 'Data/Selectors/mealsSelectors';


describe('#Data #Selectors #mealSelectors', function() {
    describe('#meals', function() {
        it('should return a Maybe of a list of meals if present.', function() {
            const testStore = {
                meals: {
                    meals: [{ name: 'meal1' }, { name: 'meal2' }]
                }
            };
            const result = selectors.meals(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.meals.meals);
        });

        it('should return a Maybe of nothing if the meals property is null.', function() {
            const testStore = {
                meals: {}
            };
            const result = selectors.meals(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });

        it('should return a Maybe of nothing if the meals store is not present.', function() {
            const testStore = {};
            const result = selectors.meals(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });
    });

    describe('#messages', function() {
        it('should return a Maybe of a list of messages if present.', function() {
            const testStore = {
                meals: {
                    messages: [{ name: 'meal1' }, { name: 'meal2' }]
                }
            };

            const result = selectors.messages(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.meals.messages);
        });

        it('should return a Maybe of nothing if the messages property is null.', function() {
            const testStore = {
                meals: {}
            };
            const result = selectors.messages(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });

        it('should return a Maybe of nothing if the meals store is not present.', function() {
            const testStore = {};
            const result = selectors.messages(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });
    });
});