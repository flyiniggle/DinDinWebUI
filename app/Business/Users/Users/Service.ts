import DinDinServiceConnector from "Business/Services/DinDinServiceConnector";
import User from 'Business/Auth/Types/User'
import { Result } from "true-myth";
import { DinDinServiceResponse } from 'Business/Services/Types/DinDinServiceResponse';

interface IUserService {
    get: () => DinDinServiceResponse<User, unknown>
}

const UsersService: IUserService = {
    get: () => DinDinServiceConnector.send('/users/')
};

export default UsersService;