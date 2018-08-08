// String => String => Promise(Response.json())
import preflightCheck from 'Business/Signup/Validation/preflightCheck';

async function signup(data) {
    const errors = preflightCheck(data);

    if (errors.length > 0) {
        return errors;
    }
    const signupResult = await Promise.resolve('yay!');

    return signupResult;
}

export default signup;