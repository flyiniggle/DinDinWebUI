import createMeal from 'Business/Meals/createMeal';
import MealService from 'Business/Meals/Service';

describe('#Business #Meals #createMeal', function() {
    afterEach(fetch.resetMocks);
    it('should send a new meal to the server.', async function() {
        const newMeal = {
            name: 'yummfood',
            taste: 5,
            difficulty: 1,
            ingredients: ['yumminess', 'food'],
            notes: 'pretty darn good'
        };

        expect.assertions(1);
        await createMeal(newMeal);

        expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(newMeal);
    });

    it('should return a result with a formatted meal.', async function() {
        const expected = {
            id: 23,
            name: 'yummy tasty food',
            owner: 'admin',
            taste: 3,
            difficulty: 5,
            usedCount: 0,
            notes: '',
            ingredients: ['goodness', 'and', 'stuff']
        };

        fetch.resetMocks();
        fetch.mockResponse(JSON.stringify({
            pk: 23,
            name: 'yummy tasty food',
            owner: 'admin',
            taste: 3,
            difficulty: 5,
            used_count: 0,
            notes: '',
            ingredients: ['goodness', 'and', 'stuff']
        }));

        expect.assertions(1);
        const result = await createMeal({
            name: 'yummy tasty food',
            taste: 3,
            difficulty: 5,
            notes: '',
            ingredients: ['goodness', 'and', 'stuff']
        });

        expect(result.unwrapOrElse('uh oh')).toEqual(expected);
    });
});