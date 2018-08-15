import SignupService from 'Business/Signup/Service';
import preflightCheck from 'Business/Signup/Validation/preflightCheck';
import Message from "Business/Validation/Types/Message";

interface SignupData {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
}
// SignupData => Promise(Response.json())
async function signup(data: SignupData): Promise<Message[]> {
    const errors = preflightCheck(data);

    if (errors.length > 0) {
        return errors;
    }
    const {username, password, email} = data;
    const signupResult = await SignupService.post(username, password, email);

    return signupResult;
}

export default signup;