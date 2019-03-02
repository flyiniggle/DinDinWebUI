import * as selectors from 'Data/Selectors/dashboardSelectors';


describe('#Data #Selectors #dashboardSelectors', function() {
    describe('#isLoading', function() {
        it('should return the loading state.', function() {
            const testStore = {
                dashboard: {
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
                dashboard: {
                    messages: [{ name: 'meal1' }, { name: 'meal2' }]
                }
            };

            const result = selectors.messages(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.dashboard.messages);
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