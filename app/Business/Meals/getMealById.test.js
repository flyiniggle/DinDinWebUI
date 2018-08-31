import getMealById from './getMealById';
import fixtures from './getMealById.fixtures';

describe('#Business #Meals #getMealById', function() {
    it('should return the meal with a matching id.', function() {
        expect(getMealById(10, fixtures.meals).name).toEqual('Gnocchi');
    });

    it('should return the meal with a matching id if given a string.', function() {
        expect(getMealById('18', fixtures.meals).name).toEqual('Chicken Stir Fry');
    });

    it('should return nothing if no matching meal is found.', function() {
        expect(getMealById('1000', fixtures.meals)).not.toBeDefined();
    });
});