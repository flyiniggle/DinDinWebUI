import SignupService from 'Business/Signup/Service';
import preflightCheck from 'Business/Signup/Validation/preflightCheck';
import Message from "Business/Validation/Types/Message";
import responseCheck from "Business/Signup/Validation/responseCheck";
import { Result } from "true-myth";
import User from "Business/Auth/Types/User";

interface SignupData {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}
// SignupData => Promise(Response.json())
async function signup(data: SignupData): Promise<Result<User, Message[]>> {
    const errors = preflightCheck(data);

    if (errors.length > 0) {
        return Result.err(errors);
    }
    const {username, password, email} = data;
    const signupResult = await SignupService.post(username, password, email);
    const responseErrors = responseCheck(signupResult);

    if(responseErrors.length) {
        return Result.err(responseErrors);
    }

    return Result.ok(signupResult);
}

export default signup;