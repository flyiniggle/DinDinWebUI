import * as selectors from 'Data/Selectors/mealCreatorSelectors';


describe('#Data #Selectors #mealCreatorSelectors', function() {
    describe('#newMeal', function() {
        it('should return the meal data.', function() {
            const newMeal = {
                name: '',
                ingredients: [],
                taste: 0,
                difficulty: 0,
                notes: ''
            };
            const testStore = {
                mealCreator: {
                    newMeal
                }
            };
            const result = selectors.newMeal(testStore);

            expect(result).toMatchObject(newMeal);
        });
    });

    describe('#isSaved', function() {
        it('should return the dirty state.', function() {
            const testStore = {
                mealCreator: {
                    isSaved: true
                }
            };
            const result = selectors.isSaved(testStore);

            expect(result).toBe(true);
        });
    });

    describe('#isLoading', function() {
        it('should return the loading state.', function() {
            const testStore = {
                mealCreator: {
                    isLoading: true
                }
            };
            const result = selectors.isLoading(testStore);

            expect(result).toBe(true);
        });
    });

    describe('#messages', function() {
        it('should return a Maybe of a list of messages if present.', function() {
            const testStore = {
                mealCreator: {
                    messages: [{ name: 'meal1' }, { name: 'meal2' }]
                }
            };

            const result = selectors.messages(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.mealCreator.messages);
        });

        it('should return a Maybe of nothing if the messages property is null.', function() {
            const testStore = {
                dashboard: {}
            };
            const result = selectors.messages(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });

        it('should return a Maybe of nothing if the dashboard store is not present.', function() {
            const testStore = {};
            const result = selectors.messages(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });
    });
});