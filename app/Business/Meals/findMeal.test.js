import findMeal from './findMeal';

describe('#Business #Meals #findMeal', function() {
    it('should return true if the meal name matches the search parameter.', function() {
        const meal = {
            name: 'bananas',
            ingredients: []
        };

        expect(findMeal('bananas', meal)).toBe(true);
    });

    it('should return true if the meal name substring matches the search parameter.', function() {
        const meal = {
            name: 'bananas',
            ingredients: []
        };

        expect(findMeal('nanas', meal)).toBe(true);
    });

    it('should match case-insensitively.', function() {
        const meal1 = {
            name: 'BANANAS',
            ingredients: []
        };
        const meal2 = {
            name: 'bananas',
            ingredients: []
        };

        expect(findMeal('Bananas', meal1)).toBe(true);
        expect(findMeal('Bananas', meal2)).toBe(true);
    });

    it('should search for matching keywords in ingredients.', function() {
        const meal = {
            name: 'bananas',
            ingredients: ['guanaco', 'carne', 'pollo', 'lechuga']
        };

        expect(findMeal('guanaco', meal)).toBe(true);
    });

    it('should match ingredient substrings,', function() {
        const meal = {
            name: 'bananas',
            ingredients: ['chicken breast']
        };

        expect(findMeal('chick', meal)).toBe(true);
    });

    it('should match ingredients case-insensitively.', function() {
        const meal = {
            name: 'bananas',
            ingredients: ['guanaco', 'carne', 'pollo', 'lechuga']
        };

        expect(findMeal('Guanaco', meal)).toBe(true);
    });

    it('should return false if neither name nor ingredients match.', function() {
        const meal = {
            name: 'spaghetti',
            ingredients: ['spaghetti', 'sauce', 'meatball']
        };

        expect(findMeal('carne', meal)).toBe(false);
    });
});