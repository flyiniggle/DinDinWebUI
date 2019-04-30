import React from 'react';
import { shallow } from 'enzyme';
import { Maybe } from 'true-myth';
import maybe from 'Business/Lib/maybe';

import renderMealCards from './renderMealCards';


describe('#Components #Dashboard #renderMealCards', function() {
    const testMeals = [
        {
            id: 25,
            name: 'Lentil Chorizo Stew',
            owner: 'admin',
            taste: 0,
            difficulty: 0,
            lastUsed: null,
            usedCount: 0,
            notes: 'I miss you.',
            ingredients: [
                'lentils',
                'chorizo',
                'onion'
            ]
        },
        {
            id: 24,
            name: 'Burgers',
            owner: 'admin',
            taste: 0,
            difficulty: 0,
            lastUsed: null,
            usedCount: 0,
            notes: 'Back home...',
            ingredients: [
                'ground beef',
                'buns',
                'lettuce',
                'tomato',
                'ketchup',
                'mustard',
                'bacon',
                'sesame seeds',
                'onions',
                'pickles',
                'eggs',
                'cheese',
                'worschestershire sauce'
            ]
        }
    ];

    it('should show loading status if no meals are loaded.', function() {
        const props = {
            meals: new Maybe.Nothing(),
            filteredMeals: new Maybe.Nothing(),
            dashboardIsLoading: true,
            mealIsUpdating: false
        };
        const wrapper = shallow(renderMealCards(props));
        expect(wrapper.text()).toEqual('Loading...');
    });

    it('should show no existing meals message if meals are loaded but none exist.', function() {
        const props = {
            meals: maybe([]),
            filteredMeals: maybe([]),
            dashboardIsLoading: false,
            mealIsUpdating: false
        };
        const wrapper = shallow(renderMealCards(props));
        expect(wrapper.text()).toEqual('You haven\'t made any meals yet!');
    });

    it('should show the no matching meals message if meals are loaded but none match search criteria.', function() {
        const props = {
            meals: maybe(testMeals),
            filteredMeals: maybe([]),
            dashboardIsLoading: false,
            mealIsUpdating: false
        };
        const wrapper = shallow(renderMealCards(props));
        expect(wrapper.text()).toEqual('No meals matched your search.');
    });

    it('should render the filtered meals.', function() {
        const props = {
            meals: maybe(testMeals),
            filteredMeals: maybe(testMeals),
            dashboardIsLoading: false,
            mealIsUpdating: false
        };
        const wrapper = shallow(<div>{renderMealCards(props)}</div>);

        expect(wrapper.find('MealCard')).toHaveLength(2);
    });


    it('should not render the whole meals list.', function() {
        const props = {
            meals: maybe(testMeals),
            filteredMeals: maybe([testMeals[1]]),
            dashboardIsLoading: false,
            mealIsUpdating: false
        };
        const wrapper = shallow(<div>{renderMealCards(props)}</div>);

        expect(wrapper.find('MealCard')).toHaveLength(1);
    });

    it('should show an error if meals are not loading but no meals value has been set.', function() {
        const props = {
            meals: maybe(undefined),
            filteredMeals: maybe(undefined),
            dashboardIsLoading: false,
            mealIsUpdating: false
        };
        const wrapper = shallow(renderMealCards(props));
        expect(wrapper.text()).toEqual('Oops! Something went wrong.');
    });

    it('should show an error if meals are not loading but no filtered meals value has been set.', function() {
        const props = {
            meals: maybe(testMeals),
            filteredMeals: maybe(undefined),
            dashboardIsLoading: false,
            mealIsUpdating: false
        };
        const wrapper = shallow(renderMealCards(props));
        expect(wrapper.text()).toEqual('Oops! Something went wrong.');
    });
});