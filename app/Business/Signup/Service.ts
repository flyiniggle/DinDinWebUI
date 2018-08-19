import DinDinService from 'Business/Services/DinDinService';
import { Result } from 'true-myth';
import User from "Business/Auth/Types/User";


const SignupService = {
    post: function(u: string, p: string, e: string): Promise<Result<User, any>> {
        return DinDinService.send('/users/create/', {
            method: 'POST',
            body: JSON.stringify({username: u, password: p, email: e})
        });
    }
};

export default SignupService;