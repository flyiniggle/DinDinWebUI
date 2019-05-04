import DinDinService from "Business/Services/DinDinService";


const ProfileService = {
    get: () => DinDinService.send('/users/profile')
}


export default ProfileService;