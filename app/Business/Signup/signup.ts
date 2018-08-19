import SignupService from 'Business/Signup/Service';
import preflightCheck from 'Business/Signup/Validation/preflightCheck';
import Message from "Business/Validation/Types/Message";
import responseCheck from "Business/Signup/Validation/responseCheck";
import { Result } from "true-myth";
import User, { createUser } from "Business/Auth/Types/User";
import {create} from "domain";

interface SignupData {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}
// SignupData => Promise(Result<User, Message[]>)
async function signup(data: SignupData): Promise<Result<User, Message[]>> {
    const errors = preflightCheck(data);

    if (errors.length > 0) {
        return Result.err(errors);
    }
    const {username, password, email} = data;
    const signupResult: Result<User, any> = await SignupService.post(username, password, email);

    if(Result.isErr(signupResult)) {
        return signupResult.mapErr(responseCheck);
    }
    return signupResult.map((user) => createUser(user.username, user.email));
}

export default signup;