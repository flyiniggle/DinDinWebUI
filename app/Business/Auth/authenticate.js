import AuthService from 'Business/Auth/Service';
import preflightCheck from 'Business/Auth/Validation/preflightCheck';
import responseCheck from 'Business/Auth/Validation/responsesCheck';

// String => String => Promise(Response.json())
function authenticate(username, password) {
    const errors = preflightCheck({username, password});

    if (errors.length === 0) {
        return AuthService.get(username, password)
            .then(function(data) {
                const responseErrors = responseCheck(data);

                if (responseErrors.length === 0) {
                    return data;
                }

                return Promise.reject(responseErrors);
            });
    }
    return Promise.reject(errors);
}

export default authenticate;