import DinDinService from "Business/Services/DinDinService";
import IUser from 'Business/Auth/Types/User'
import { Result } from "true-myth";

interface IUserService {
    get: () => Promise<Result<IUser, unknown>>
}

const UsersService: IUserService = {
    get: () => DinDinService.send('/users/')
};

export default UsersService;