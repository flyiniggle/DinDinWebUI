import DinDinService from 'Business/Services/DinDinService';


const SignupService = {
    create: function(u: string, p: string, e: string): Promise<any> {
        return DinDinService.send('/users/create', {
            method: 'CREATE',
            body: JSON.stringify({username: u, password: p, email: e})
        }).then(body => body.json());
    }
};

export default SignupService;