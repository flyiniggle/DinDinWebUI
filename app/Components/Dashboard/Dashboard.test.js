import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import Dashboard from './Dashboard';

describe('#Components #Dashboard #Dashboard', function() {
    let store;

    beforeEach(function() {
        store = configureStore()({});
    });
    it('should render.', function() {
        expect(() => mount(
            <Provider store={ store }>
                <StaticRouter basename="" context={ {} } location="/">
                    <Dashboard />
                </StaticRouter>
            </Provider>)).not.toThrow();
    });
});