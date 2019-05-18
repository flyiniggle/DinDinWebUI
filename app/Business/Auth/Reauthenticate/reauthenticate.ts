import ReauthenticateService from 'Business/Auth/Reauthenticate/Service';
import { prop } from 'ramda';
import authStatus from '../authStatus';


async function reauthenticate(): Promise<void> {
    const result = await ReauthenticateService.post(authStatus.authToken);
    const newToken = <string>result.match({
        Ok: prop('token'),
        Err: () => ''
    });

    authStatus.authToken = newToken;
}

export default reauthenticate