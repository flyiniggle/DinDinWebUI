import DinDinService from 'Business/Services/DinDinService';


const SignupService = {
    post: function(u, p, e) {
        return DinDinService.send('/users/create', {
            method: 'POST',
            body: JSON.stringify({username: u, password: p, email: e})
        }).then(body => body.json());
    }
};

export default SignupService;