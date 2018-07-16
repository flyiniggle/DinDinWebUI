const DinDinAPI = __APIRoot__;

const formdata = new FormData();
const headers = new Headers();

const AuthService = {
    get: function(u, p) {
        formdata.append('username', u);
        formdata.append('password', p);

        const authHeader = btoa(`${u}: ${p}`);

        headers.append('Authorization', `Basic ${authHeader}`);
        console.log(DinDinAPI);
        return fetch(`${DinDinAPI}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({username: u, password: p})
        });
    }
};

export default AuthService;