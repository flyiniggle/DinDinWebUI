import DinDinService from "Business/Services/DinDinService";


const UsersService = {
    get: () => DinDinService.send('/users/')
};

export default UsersService;