import updateMeal from 'Business/Meals/updateMeal';

describe('#Business #Meals #updateMeal', function() {
    const meal = {
        id: 4,
        name: 'delish dish',
        owner: 'jamal',
        taste: 5,
        difficulty: 4,
        lastUsed: '2018-01-01',
        usedCount: 3,
        notes: 'gonna use you!'
    };

    it('should return a meal with the specified updates applied.', function() {
        const updates = {
            name: 'updated name'
        };
        const result = updateMeal(meal, updates);

        expect(result.name).toEqual(updates.name);
    });

    it('should not change omitted properties.', function() {
        const updates = {
            name: 'updated name'
        };
        const result = updateMeal(meal, updates);

        expect(result.id).toEqual(meal.id);
        expect(result.owner).toEqual(meal.owner);
        expect(result.taste).toEqual(meal.taste);
        expect(result.difficulty).toEqual(meal.difficulty);
        expect(result.lastUsed).toEqual(meal.lastUsed);
        expect(result.usedCount).toEqual(meal.usedCount);
        expect(result.notes).toEqual(meal.notes);

    });
});