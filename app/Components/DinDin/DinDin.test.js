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
});