import authStatus, { TOKEN_KEY, USERNAME_KEY } from './authStatus';

describe('#Business #Auth #authStatus', function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';

    describe('#loggedIn', function() {

        afterEach(() => { localStorage.removeItem(TOKEN_KEY); });

        describe('#get', function() {
            it('should return the token if the authenticated key is set in local storage.', function() {
                localStorage.setItem(TOKEN_KEY, token);
                expect(authStatus.authToken).toEqual(token);
            });

            it('should return false if the authenticated key is set to false in local storage.', function() {
                expect(authStatus.authToken).toBeNull();
            });

            it('should return undefined by default.', function() {
                localStorage.clear();
                expect(authStatus.authToken).toBeNull();
            });
        });

        describe('#set', function() {
            it('should set the authenticated key in local storage.', function() {
                authStatus.authToken = token;
                expect(localStorage.getItem(TOKEN_KEY)).toEqual(token);
            });

            it('should remove the authenticated key in local storage.', function() {
                authStatus.authToken = '';
                expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
            });
        });
    });

    describe('#username', function() {

        afterEach(() => { localStorage.removeItem(USERNAME_KEY); });

        describe('#get', function() {
            it('should return the appropriate value from local storage.', function() {
                localStorage.setItem(USERNAME_KEY, 'test user');
                expect(authStatus.username).toEqual('test user');
            });

            it('should return default text if there is no user.', function() {
                localStorage.setItem(USERNAME_KEY, '');
                expect(authStatus.username).toEqual('not logged in');
            });
        });

        describe('#set', function() {
            it('should set an item for later getting', function() {
                authStatus.username = 'test';

                expect(localStorage.getItem(USERNAME_KEY)).toEqual('test');
            });
        });
    });

    describe('#logOut', function() {
        it('should set auth status settings to logged out.', function() {
            authStatus.username = 'this guy';
            authStatus.authToken = token;
            authStatus.logOut();

            expect(authStatus.username).toEqual('not logged in');
            expect(authStatus.authToken).toBeNull();
        });
    });
});