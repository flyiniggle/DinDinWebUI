import dateString from 'UI/Formatting/dateString';

import useMeal from './useMeal';

describe('#Business #Meals #useMeal', function() {
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

    // it('should send a request to the correct URL.', async function() {
    //     expect.assertions(2);
    //     await useMeal(meal);

    //     expect(fetch.mock.calls[0][0]).toEqual(`${__APIRoot__}/meals/4/`);
    //     expect(fetch.mock.calls[0][1].method).toEqual('PATCH');
    // });


    it('should update the meal date.', function() {
        const updatedMeal = useMeal(meal);
        const today = dateString.store(new Date());

        expect(updatedMeal.lastUsed).toEqual(today);
    });

    it('should update the meal use count', function() {
        const updatedMeal = useMeal(meal);

        expect(updatedMeal.usedCount).toEqual(4);
    });
});