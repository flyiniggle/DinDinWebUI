import DinDinService from 'Business/Services/DinDinServiceConnector';


const AuthService = {
    post: function(data) {
        return DinDinService.send('/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

export default AuthService;