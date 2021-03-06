import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter, Redirect } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount, render } from 'enzyme';
import Splash from 'Components/Splash/Splash';
import Dashboard from 'Components/Dashboard/Dashboard';
import authStatus from 'Business/Auth/authStatus';

import DinDin from './DinDin';


const initialState = {
    meals: [],
    responsive: {
        phone: false,
        tablet: false,
        mobile: false,
        desktop: false,
        fakeWidth: 1200
    }
};
let store;

describe('#Components #DinDin #DinDin', function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';

    beforeEach(function() {
        store = configureStore()(initialState);
    });

    it('should render the splash page if not logged in.', function() {
        const wrapper = mount(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/">
                    <DinDin />
                </StaticRouter>
            </Provider>);

        expect(wrapper.find(Splash).exists()).toBe(true);
    });

    it('should redirect to the login component if the user tries to access the dashboard while not logged in.', function() {
        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/meals"><DinDin /></StaticRouter>);
        authStatus.logOut();

        expect(wrapper.find(Dashboard).exists()).toBe(false);
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

        expect(wrapper.find(Dashboard).exists()).toBe(true);

        authStatus.logOut();
    });

    // it('should render the Dashboard page if logged in.', function () {
    //     authStatus.authToken = token;
    //     authStatus.username = 'me';

    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <StaticRouter basename="" context={{}} location="/login">
    //                 <DinDin />
    //             </StaticRouter>
    //         </Provider>);

    //     expect(wrapper.find(Dashboard).exists()).toBe(true);

    //     authStatus.logOut();
    // });

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

            expect(wrapper.find(Dashboard).exists()).toBe(true);

            wrapper.find(DinDin).instance().logOut();
            wrapper.update();

            expect(wrapper.find(Dashboard).exists()).toBe(false);
            expect(wrapper.find(Redirect).exists()).toBe(true);
            expect(wrapper.find(Redirect).props().to.pathname).toEqual('/login');
        });
    });

});