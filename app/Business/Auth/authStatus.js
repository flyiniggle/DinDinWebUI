const KEY = 'DinDinLoggedIn';

const authStatus = {
    get loggedIn() {
        return window.localStorage.getItem(KEY) === 'true';
    },

    set loggedIn(loggedIn) {
        window.localStorage.setItem(KEY, Boolean(loggedIn).toString());
    }
};

export default authStatus;
export { KEY };