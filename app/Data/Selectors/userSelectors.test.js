import * as selectors from 'Data/Selectors/userSelectors';


describe('#Data #Selectors #userSelectors', function() {
    describe('#email', function() {
        it('should return a Maybe of the email if present.', function() {
            const testStore = {
                user: {
                    email: 'here@home.com'
                }
            };
            const result = selectors.email(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.user.email);
        });

        it('should return a Maybe of nothing if the email property is null.', function() {
            const testStore = {
                user: {}
            };
            const result = selectors.email(testStore);

            expect(result.unwrapOr('fail')).toEqual('fail');
        });

        it('should return a Maybe of nothing if the user store is not present.', function() {
            const testStore = {};
            const result = selectors.email(testStore);

            expect(result.unwrapOr('fail')).toEqual('fail');
        });
    });

    describe('#username', function() {
        it('should return a Maybe of the username if present.', function() {
            const testStore = {
                user: {
                    username: 'Jamal the Great'
                }
            };
            const result = selectors.username(testStore);

            expect(result.unwrapOr('meh')).toEqual(testStore.user.username);
        });

        it('should return a Maybe of nothing if the username property is null.', function() {
            const testStore = {
                user: {}
            };
            const result = selectors.username(testStore);

            expect(result.unwrapOr('fail')).toEqual('fail');
        });

        it('should return a Maybe of nothing if the user store is not present.', function() {
            const testStore = {};
            const result = selectors.username(testStore);

            expect(result.unwrapOr('fail')).toEqual('fail');
        });
    });
});