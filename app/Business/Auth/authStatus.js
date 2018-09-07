const TOKEN_KEY = 'DinDinLoggedIn';
const USERNAME_KEY = 'DinDinUser';

const authStatus = {
    get authToken() {
        return window.localStorage.getItem(TOKEN_KEY);
    },

    set authToken(token) {
        if (token === '') {
            window.localStorage.removeItem(TOKEN_KEY);
        }
        window.localStorage.setItem(TOKEN_KEY, token.toString());
    },

    get username() {
        return window.localStorage.getItem(USERNAME_KEY) || 'not logged in';
    },

    set username(username) {
        if (username === '') {
            window.localStorage.removeItem(USERNAME_KEY);
        }
        return window.localStorage.setItem(USERNAME_KEY, username);
    }
};

authStatus.logOut = function() {
    this.authToken = '';
    this.username = '';
}.bind(authStatus);

export default Object.seal(authStatus);
export { TOKEN_KEY, USERNAME_KEY };