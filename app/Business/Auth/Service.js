const DinDinAPI = __APIRoot__;

const formdata = new FormData();

const AuthService = {
    get: function(u, p) {
        formdata.append('username', u);
        formdata.append('password', p);

        return fetch(`${DinDinAPI}/api-token-auth/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json'
            },
            body: JSON.stringify({username: u, password: p})
        });
    }
};

export default AuthService;