import DinDinServiceConnector from 'Business/Services/DinDinServiceConnector';
import { DinDinServiceResponse } from 'Business/Services/Types/DinDinServiceResponse';
import IUser from "Business/Auth/Types/User";

interface SignupProps {
    username: string;
    password: string;
    email: string;
}

const SignupService = {
    post: function(data: SignupProps): DinDinServiceResponse<IUser, any> {
        return DinDinServiceConnector.send('/users/create/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

export default SignupService;
export { SignupProps };