import DinDinServiceConnector from "Business/Services/DinDinServiceConnector";


const ProfileService = {
    get: () => DinDinServiceConnector.send('/users/profile')
}


export default ProfileService;