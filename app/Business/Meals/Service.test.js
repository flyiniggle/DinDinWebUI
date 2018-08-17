import MealsService, { formatMeal } from './Service';

describe('#Business #Meals #Service', function() {
    beforeEach(() => fetch.mockResponse(JSON.stringify([])));
    afterEach(fetch.resetMocks);


    describe('#get', function() {
        it('should send a username and password to a server.', async function() {
            expect.assertions(2);
            await MealsService.get();

            expect(fetch.mock.calls[0][0]).toEqual(`${__APIRoot__}/meals/`);
            expect(fetch.mock.calls[0][1].method).toEqual('GET');
        });
    });

    describe('#formatMeal', function() {
        it('should return a formatted object', function() {
            const data = {
                pk: 1,
                name: 'delicious meal',
                owner: 'jamal',
                taste: 5,
                difficulty: 3,
                last_used: '10-21-2018',
                used_count: 5,
                notes: 'Test. Meal. Ever.'
            };
            const expected = {
                id: 1,
                name: 'delicious meal',
                owner: 'jamal',
                taste: 5,
                difficulty: 3,
                lastUsed: '10-21-2018',
                usedCount: 5,
                notes: 'Test. Meal. Ever.'
            };

            expect(formatMeal(data)).toEqual(expected);

        });
    });
});