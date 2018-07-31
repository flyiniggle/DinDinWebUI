import DinDinService from 'Business/Services/DinDinService';


const AuthService = {
    get: function(u, p) {
        return DinDinService.send('/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify({username: u, password: p})
        }).then(body => body.json());
    }
};

export default AuthService;