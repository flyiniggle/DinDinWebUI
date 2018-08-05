import MealsService from './Service';

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
});