import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, Redirect } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Splash from 'Components/Splash/Splash';
import Dashboard from 'Components/Dashboard/Dashboard';
import authStatus from 'Business/Auth/authStatus';
import getMealById from 'Business/Meals/getMealById';

import DinDin from './DinDin';
import fixtures from './DinDin.fixtures';


const initialState = { meals: [] };
let store;

describe('#Components #DinDin #DinDin', function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';

    beforeEach(function() {
        store = configureStore()(initialState);
    });

    it('should render the splash page if not logged in.', function() {
        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/"><DinDin /></StaticRouter>);

        expect(wrapper.find(Splash).exists()).toBe(true);
    });

    it('should redirect to the login component if the user tries to access the dashboard while not logged in.', function() {
        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/meals"><DinDin /></StaticRouter>);
        authStatus.logOut();

        expect(wrapper.contains(Dashboard)).toBe(false);
        expect(wrapper.find(Redirect).exists()).toBe(true);
        expect(wrapper.find('Redirect').props().to.pathname).toEqual('/login');
    });

    it('should render the Dashboard page if logged in.', function() {
        authStatus.authToken = token;
        authStatus.username = 'me';

        const wrapper = mount(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <DinDin />
                </StaticRouter>
            </Provider>
        );

        expect(wrapper.contains(Dashboard)).toBe(true);

        authStatus.logOut();
    });

    it('should render the Dashboard page if logged in.', function() {
        authStatus.authToken = token;
        authStatus.username = 'me';

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/login"><DinDin /></StaticRouter>);

        expect(wrapper.contains(Dashboard)).toBe(true);

        authStatus.logOut();
    });

    describe('#logOut', function() {
        it('should redirect to the login when a user logs out.', function() {
            authStatus.authToken = token;
            authStatus.username = 'me';

            const wrapper = mount(
                <Provider store={ store }>
                    <StaticRouter basename="" context={ {} } location="/meals">
                        <DinDin />
                    </StaticRouter>
                </Provider>
            );

            expect(wrapper.contains(Dashboard)).toBe(true);

            wrapper.find(DinDin).instance().logOut();
            wrapper.update();

            expect(wrapper.contains(Dashboard)).toBe(false);
            expect(wrapper.find(Redirect).exists()).toBe(true);
            expect(wrapper.find(Redirect).props().to.pathname).toEqual('/login');
        });
    });

    describe('#setMeals', function() {
        it('should set meals.', function() {
            const wrapper = mount(<StaticRouter basename="" context={ {} } location="/"><DinDin /></StaticRouter>);

            wrapper.find(DinDin).instance().setMeals(fixtures.meals);

            expect(wrapper.find(DinDin).instance().state.meals).toEqual(fixtures.meals);
        });
    });

    describe('#updateMeal', function() {
        it('should update the meal with the matching id.', function() {
            const wrapper = mount(<StaticRouter basename="" context={ {} } location="/"><DinDin /></StaticRouter>);
            const dinDinInstance = wrapper.find(DinDin).instance();
            const updateData = { id: 10, usedCount: 2, difficulty: 8 };

            dinDinInstance.setMeals(fixtures.meals);
            dinDinInstance.updateMeal(updateData);

            const result = getMealById(10, dinDinInstance.state.meals);
            const expected = { id: 10, name: 'Gnocchi', owner: 'admin', collaborators: [2], taste: 5, difficulty: 8, lastUsed: '2018-05-22', usedCount: 2, ingredients: [], notes: 'Don\'t knead too much; cut them small so they cook fast' };

            expect(result).toEqual(expected);
        });

        it('should do nothing if there are no meals.', function() {
            const wrapper = mount(
                <Provider store={ store }>
                    <StaticRouter basename="" context={ {} } location="/meals">
                        <DinDin />
                    </StaticRouter>
                </Provider>
            );
            const dinDinInstance = wrapper.find(DinDin).instance();
            const updateData = { id: 10, usedCount: 2, difficulty: 8 };
            const updater = () => { dinDinInstance.updateMeal(updateData); };

            expect(updater).not.toThrow();
            expect(dinDinInstance.state.meals).toBeNull();
        });

        it('should do nothing if there is no matching meal.', function() {
            const wrapper = mount(<StaticRouter basename="" context={ {} } location="/"><DinDin /></StaticRouter>);
            const dinDinInstance = wrapper.find(DinDin).instance();
            const updateData = { id: 100, usedCount: 2, difficulty: 8 };
            const updater = () => { dinDinInstance.updateMeal(updateData); };

            dinDinInstance.setMeals(fixtures.meals);

            expect(updater).not.toThrow();
            expect(dinDinInstance.state.meals).toEqual(fixtures.meals);
        });
    });

    describe('#useMeal', function() {
        it('should increment the state meal usedCount property.', async function() {
            const wrapper = mount(<StaticRouter basename="" context={ {} } location="/"><DinDin /></StaticRouter>);
            const dinDinInstance = wrapper.find(DinDin).instance();
            const originalMeal = fixtures.meals[0];
            const responseData = Object.assign(fixtures.APIMeals[0], { used_count: (originalMeal.usedCount + 1) });

            fetch.mockResponseOnce(JSON.stringify(responseData));

            expect.assertions(1);
            dinDinInstance.setMeals(fixtures.meals);
            await dinDinInstance.useMeal(originalMeal);

            const updatedMeal = getMealById(originalMeal.id, dinDinInstance.state.meals);

            expect(updatedMeal.usedCount).toEqual(originalMeal.usedCount + 1);
        });
    });
});