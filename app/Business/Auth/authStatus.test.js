import authStatus, { KEY, USERNAME_KEY } from './authStatus';

describe('#Business #Auth #authStatus', function() {
    describe('#loggedIn', function() {

        afterEach(() => { localStorage.removeItem(KEY); });

        describe('#get', function() {
            it('should return true if the authenticated key is set to true in local storage.', function() {
                localStorage.setItem(KEY, 'true');
                expect(authStatus.loggedIn).toEqual(true);
            });

            it('should return false if the authenticated key is set to false in local storage.', function() {
                localStorage.setItem(KEY, 'false');
                expect(authStatus.loggedIn).toEqual(false);
            });

            it('should return false by default.', function() {
                localStorage.clear();
                expect(authStatus.loggedIn).toEqual(false);
            });
        });

        describe('#set', function() {
            it('should set the authenticated key in local storage to true', function() {
                authStatus.loggedIn = true;
                expect(localStorage.getItem(KEY)).toEqual('true');
            });

            it('should set the authenticated key in local storage to false', function() {
                authStatus.loggedIn = false;
                expect(localStorage.getItem(KEY)).toEqual('false');
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
});