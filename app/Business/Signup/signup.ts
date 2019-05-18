import SignupService, { SignupProps } from 'Business/Signup/Service';
import preflightCheck from 'Business/Signup/Validation/preflightCheck';
import Message from "Business/Validation/Types/Message";
import responseCheck from "Business/Signup/Validation/responseCheck";
import { Result } from "true-myth";
import { pipe, pipeWith, then } from 'ramda';
import User, { createUser } from "Business/Auth/Types/User";
import { DinDinServiceResponse } from 'Business/Services/Types/DinDinServiceResponse';

interface SignupData {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}

async function signup(data: SignupData): DinDinServiceResponse<User, Message[]> {
    const trySignup: (t: SignupProps) => Result<User, Message[]> = pipeWith(then)([
        SignupService.post,
        Result.mapErr(responseCheck)
    ]);
    const result: Result<User, Message[]> = await pipe(
        preflightCheck,
        Result.andThen(trySignup)
    )(data);

    return result.map((user) => createUser(user.username, user.email));
}

export default signup;