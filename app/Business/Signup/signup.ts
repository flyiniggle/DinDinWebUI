import SignupService from 'Business/Signup/Service';
import preflightCheck from 'Business/Signup/Validation/preflightCheck';

interface signupData {
    username: string;
    email: string;
    password: string;
}
// String => String => Promise(Response.json())
async function signup(data: signupData): Promise<any[]> {
    const errors = preflightCheck(data);

    if (errors.length > 0) {
        return errors;
    }
    const {username, password, email} = data;
    const signupResult = await SignupService.create(username, password, email);

    return signupResult;
}

export default signup;