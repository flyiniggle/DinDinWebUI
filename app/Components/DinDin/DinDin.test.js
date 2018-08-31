import React from 'react';
import { StaticRouter, Redirect } from 'react-router-dom';
import { mount } from 'enzyme';
import Splash from 'Components/Splash/Splash';
import Dashboard from 'Components/Dashboard/Dashboard';
import authStatus from 'Business/Auth/authStatus';

import DinDin from './DinDin';

describe('#Components #DinDin #DinDin', function() {
    it('should render the splash page if not logged in.', function() {
        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/"><DinDin /></StaticRouter>);

        expect(wrapper.find(Splash).exists()).toBe(true);
    });

    it('should redirect to the login component if the user tries to access the dashboard while not logged in.', function() {
        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/dashboard"><DinDin /></StaticRouter>);
        authStatus.logOut();

        expect(wrapper.contains(Dashboard)).toBe(false);
        expect(wrapper.find(Redirect).exists()).toBe(true);
        expect(wrapper.find('Redirect').props().to.pathname).toEqual('/login');
    });

    it('should render the Dashboard page if logged in.', function() {
        authStatus.loggedIn = true;
        authStatus.username = 'me';

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/dashboard"><DinDin /></StaticRouter>);

        expect(wrapper.contains(Dashboard)).toBe(true);

        authStatus.logOut();
    });

    it('should render the Dashboard page if logged in.', function() {
        authStatus.loggedIn = true;
        authStatus.username = 'me';

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/login"><DinDin /></StaticRouter>);

        expect(wrapper.contains(Dashboard)).toBe(true);

        authStatus.logOut();
    });

    describe('#logOut', function() {
        it('should redirect to the login when a user logs out.', function() {
            authStatus.loggedIn = true;
            authStatus.username = 'me';

            const wrapper = mount(<StaticRouter basename="" context={ {} } location="/dashboard"><DinDin /></StaticRouter>);

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
            const meals = [{ id: 1 }, { id: 2 }, { id: 3 }];

            wrapper.find(DinDin).instance().setMeals(meals);

            expect(wrapper.find(DinDin).instance().state.meals).toEqual(meals);
        });
    });
});