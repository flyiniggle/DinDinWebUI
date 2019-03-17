import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from './Header';

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

describe('#Components #Header #Header', function() {
    beforeEach(function() {
        store = configureStore()(initialState);
    });

    it('should render.', function() {
        const wrapper = render(
            <Provider store={ store }>
                <Header />
            </Provider>);

        expect(wrapper.html()).toMatchSnapshot();
    });
});