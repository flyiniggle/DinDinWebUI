import MealsService, { formatMeal, formatMealToAPI } from './Service';

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

    describe('#patch', function() {
        it('should send a patch request to the correct meal url.', async function() {
            expect.assertions(2);
            await MealsService.patch(5, {});

            expect(fetch.mock.calls[0][0]).toEqual(`${__APIRoot__}/meals/5/`);
            expect(fetch.mock.calls[0][1].method).toEqual('PATCH');
        });

        it('should send an API formatted meal', async function() {
            const data = {
                lastUsed: '2018-04-02',
                usedCount: 5
            };
            const expected = {
                last_used: '2018-04-02',
                used_count: 5
            };

            expect.assertions(1);
            await MealsService.patch(235, data);

            expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(expected));

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

    describe('#formatMealToAPI', function() {
        it('should return a formatted object', function() {
            const expected = {
                pk: 1,
                name: 'delicious meal',
                owner: 'jamal',
                taste: 5,
                difficulty: 3,
                last_used: '10-21-2018',
                used_count: 5,
                notes: 'Test. Meal. Ever.'
            };
            const data = {
                id: 1,
                name: 'delicious meal',
                owner: 'jamal',
                taste: 5,
                difficulty: 3,
                lastUsed: '10-21-2018',
                usedCount: 5,
                notes: 'Test. Meal. Ever.'
            };

            expect(formatMealToAPI(data)).toEqual(expected);
        });

        it('should return a partial object.', function() {
            const expected = {
                last_used: '10-21-2018'
            };
            const data = {
                lastUsed: '10-21-2018'
            };

            expect(formatMealToAPI(data)).toEqual(expected);
        });
    });
});