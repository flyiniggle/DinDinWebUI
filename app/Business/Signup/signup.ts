import SignupService from 'Business/Signup/Service';
import preflightCheck from 'Business/Signup/Validation/preflightCheck';
import Message from "Business/Validation/Types/Message";
import responseCheck from "Business/Signup/Validation/responseCheck";
import { Result } from "true-myth";
import { pipe, pipeP } from 'ramda';
import IUser, { createUser } from "Business/Auth/Types/User";

interface SignupData {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}

async function signup(data: SignupData): Promise<Result<IUser, Message[]>> {
    const trySignup = pipeP(
        SignupService.post,
        Result.mapErr(responseCheck)
    );
    const result = await pipe(
        preflightCheck,
        Result.andThen(trySignup)
    )(data);

    return result.map((user) => createUser(user.username, user.email));
}

export default signup;