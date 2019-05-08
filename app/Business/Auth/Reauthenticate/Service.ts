import DinDinService from "Business/Services/DinDinServiceConnector";
import { Result } from "true-myth";


const ReauthenticateService = {
    post: function (oldToken: string): Promise<Result<unknown, unknown>> {
        const data = { token: oldToken };

        return DinDinService.send('/api-token-refresh/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

export default ReauthenticateService