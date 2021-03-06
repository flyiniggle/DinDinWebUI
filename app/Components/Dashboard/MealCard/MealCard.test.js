import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount, shallow, render } from 'enzyme';

import MealCard from './MealCard';


describe('#Components #Dashboard #MealCard', function() {
    const initialState = {
        meals: [],
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

    const meal = {
        id: 1,
        name: 'Delicious Meal',
        owner: '1',
        taste: 5,
        difficulty: 3,
        lastUsed: '2018-05-12',
        usedCount: 3,
        notes: 'this is a really good meal'
    };

    it('should render.', function() {
        expect(shallow(<MealCard meal={ meal } />)).toMatchSnapshot();
    });

    it('should show the meal name.', function() {
        const wrapper = shallow(<MealCard meal={ meal } />);

        expect(/Delicious Meal/.test(wrapper.text()));
    });

    it('should show the date the meal was last used.', function() {
        const wrapper = shallow(<MealCard meal={ meal } />);

        expect(wrapper.find('.lastUsed').text()).toEqual('May 12, 2018');
    });

    it('should show the meal taste rating.', function() {
        const wrapper = shallow(<MealCard meal={ meal } />);

        expect(wrapper.find('.taste').find('RatingDisplay').prop('value')).toEqual(5);
    });

    it('should show the difficulty rating.', function() {
        const wrapper = shallow(<MealCard meal={ meal } />);

        expect(wrapper.find('.difficulty').find('RatingDisplay').prop('value')).toEqual(3);
    });

    it('should show the numbe of times the meal was used.', function() {
        expect(render(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <MealCard meal={ meal } />
                </StaticRouter>
            </Provider>
        ).find('.usedCount').text()).toEqual('Used 3 times');

        meal.usedCount = 1;
        expect(render(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <MealCard meal={ meal } />
                </StaticRouter>
            </Provider>
        ).find('.usedCount').text()).toEqual('Used 1 time');

        meal.usedCount = 0;
        expect(render(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <MealCard meal={ meal } />
                </StaticRouter>
            </Provider>
        ).find('.usedCount').text()).toEqual('Used 0 times');
    });

    it('should call the useMeal handler when clicking the appropriate button.', function() {
        const useMealSpy = jest.fn();
        const wrapper = mount(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/meals">
                    <MealCard meal={ meal } useMeal={ useMealSpy } />
                </StaticRouter>
            </Provider>);

        wrapper.find('.useMealButton').simulate('click', { stopPropagation: () => undefined, preventDefault: () => undefined });

        expect(useMealSpy).toHaveBeenCalledWith(meal);
    });
});