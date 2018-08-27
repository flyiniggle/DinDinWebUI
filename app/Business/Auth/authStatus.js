const KEY = 'DinDinLoggedIn';
const USERNAME_KEY = 'DinDinUser';

const authStatus = {
    get loggedIn() {
        return window.localStorage.getItem(KEY) === 'true';
    },

    set loggedIn(loggedIn) {
        window.localStorage.setItem(KEY, Boolean(loggedIn).toString());
    },

    get username() {
        return window.localStorage.getItem(USERNAME_KEY) || 'not logged in';
    },

    set username(username) {
        return window.localStorage.setItem(USERNAME_KEY, username);
    }
};

authStatus.logOut = function() {
    this.loggedIn = false;
    this.username = '';
}.bind(authStatus);

export default Object.seal(authStatus);
export { KEY, USERNAME_KEY };