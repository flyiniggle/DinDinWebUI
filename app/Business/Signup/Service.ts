import DinDinService from 'Business/Services/DinDinService';
import { Result } from 'true-myth';
import IUser from "Business/Auth/Types/User";

interface SignupProps {
    username: string;
    password: string;
    email: string;
}

const SignupService = {
    post: function(data: SignupProps): Promise<Result<IUser, any>> {
        return DinDinService.send('/users/create/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

export default SignupService;
export { SignupProps };