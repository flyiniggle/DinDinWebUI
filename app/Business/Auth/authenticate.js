import authStatus from 'Business/Auth/authStatus';
import AuthService from 'Business/Auth/Service';
import preflightCheck from 'Business/Auth/Validation/preflightCheck';
import responseCheck from 'Business/Auth/Validation/responseCheck';
import { Result } from 'true-myth';

// String => String => Promise(Response.json())
async function authenticate(username, password) {
    const errors = preflightCheck({username, password});

    if (errors.length > 0) {
        return Result.err(errors);
    }

    const result = await AuthService.get(username, password);

    if (result.isErr()) {
        result.mapErr(responseCheck);
    } else {
        authStatus.loggedIn = true;
        return result;
    }
}

export default authenticate;