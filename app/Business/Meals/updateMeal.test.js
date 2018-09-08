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

    afterEach(fetch.resetMocks);

    it('should send a request to the correct URL.', async function() {
        expect.assertions(2);
        await updateMeal(meal);

        expect(fetch.mock.calls[0][0]).toEqual(`${__APIRoot__}/meals/4/`);
        expect(fetch.mock.calls[0][1].method).toEqual('PATCH');
    });

    it('should send meal data with an updated instance.', async function() {
        const updates = {
            name: 'updated name'
        };

        expect.assertions(1);
        await updateMeal(meal, updates);
        const payloadData = JSON.parse(fetch.mock.calls[0][1].body);
        expect(payloadData.name).toEqual(updates.name);
    });
});