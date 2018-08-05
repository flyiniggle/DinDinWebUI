import authStatus, { KEY } from './authStatus';

describe('#Business #Auth #authStatus #loggedIn', function() {
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