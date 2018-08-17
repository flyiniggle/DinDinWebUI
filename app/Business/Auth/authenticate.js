import authStatus from 'Business/Auth/authStatus';
import AuthService from 'Business/Auth/Service';
import preflightCheck from 'Business/Auth/Validation/preflightCheck';
import responseCheck from 'Business/Auth/Validation/responseCheck';

// String => String => Promise(Response.json())
async function authenticate(username, password) {
    const errors = preflightCheck({username, password});

    if (errors.length > 0) {
        return Promise.reject(errors);
    }

    const result = await AuthService.get(username, password);
    const responseErrors = responseCheck(result);

    if (responseErrors.length > 0) {
        return Promise.reject(responseErrors);
    }

    authStatus.loggedIn = true;
    return result;
}

export default authenticate;