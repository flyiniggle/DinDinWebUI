import DinDinService from 'Business/Services/DinDinService';


const AuthService = {
    get: function(data) {
        return DinDinService.send('/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

export default AuthService;