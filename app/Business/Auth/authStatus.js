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

export default authStatus;
export { KEY, USERNAME_KEY };