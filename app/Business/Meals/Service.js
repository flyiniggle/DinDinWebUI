import DinDinService from 'Business/Services/DinDinService';
import Meal from 'Business/Meals/Meal';


const MealsService = {
    get: function() {
        return DinDinService.send('/meals/', {
            method: 'GET'
        }).then(body => body.json());
    }
};

export default MealsService;