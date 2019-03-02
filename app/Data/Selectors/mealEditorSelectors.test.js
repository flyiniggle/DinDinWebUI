import * as selectors from 'Data/Selectors/mealEditorSelectors';


describe('#Data #Selectors #mealEditorSelectors', function() {
    describe('#isLoading', function() {
        it('should return the loading state.', function() {
            const testStore = {
                mealEditor: {
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
                mealEditor: {
                    messages: [{ name: 'meal1' }, { name: 'meal2' }]
                }
            };

            const result = selectors.messages(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.mealEditor.messages);
        });

        it('should return a Maybe of nothing if the messages property is null.', function() {
            const testStore = {
                mealEditor: {}
            };
            const result = selectors.messages(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });

        it('should return a Maybe of nothing if the mealEditor store is not present.', function() {
            const testStore = {};
            const result = selectors.messages(testStore);

            expect(result.unwrapOr([])).toEqual([]);
        });
    });
});