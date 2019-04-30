import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import TextInput from 'UI/Forms/TextInput/TextInput';

import Dashboard from './Dashboard';
import Fixtures from './Dashboard.fixtures';
import MealCard from './MealCard/MealCard';
import DashboardControl from './DashboardControl';
import DashboardView from './DashboardView';

describe('#Components #Dashboard #Dashboard', function() {
    const initialState = {
        meals: {
            meals: Fixtures.meals
        },
        responsive: {
            phone: false,
            tablet: false,
            mobile: false,
            desktop: true,
            fakeWidth: 1200
        }
    };
    let store;

    beforeEach(function() {
        store = configureStore()(initialState);
    });
    it('should render.', function() {
        expect(() => mount(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <Dashboard />
                </StaticRouter>
            </Provider>)).not.toThrow();
    });

    it('should render a meal card for each meal.', function() {
        const wrapper = mount(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <Dashboard />
                </StaticRouter>
            </Provider>);

        expect(wrapper.find(MealCard).length).toEqual(8);
    });
});