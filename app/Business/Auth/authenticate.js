import authStatus from 'Business/Auth/authStatus';
import AuthService from 'Business/Auth/Service';
import preflightCheck from 'Business/Auth/Validation/preflightCheck';
import responseCheck from 'Business/Auth/Validation/responseCheck';
import { chain, pipe, pipeP } from 'ramda';
import { Result } from 'true-myth';

// String => String => Promise(Response<Result<User, Message[]>>)
async function authenticate(username, password) {
    const authenticateUser = pipeP(
        AuthService.get,
        Result.mapErr(responseCheck)
    );
    const result = await pipe(
        preflightCheck,
        chain(authenticateUser)
    )({ username, password });

    if (result.isOk()) {
        authStatus.authToken = result.unsafelyUnwrap().token;
        authStatus.username = username;
    }

    return result.map(data => ({ username, ...data }));
}

export default authenticate;