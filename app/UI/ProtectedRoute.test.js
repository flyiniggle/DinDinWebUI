import authStatus from 'Business/Auth/authStatus';
import React from 'react';
import {mount} from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import { createSandbox } from 'sinon';
import Dashboard from 'Components/Dashboard/Dashboard';

import ProtectedRoute from './ProtectedRoute';


describe('#UI #ProtectedRoute', function() {
    const sandbox = createSandbox();

    afterEach(sandbox.restore);

    it('should render the component if the user is logged in.', function() {
        sandbox.replaceGetter(authStatus, 'loggedIn', () => true);

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/meh"><ProtectedRoute path="/meh" component={ Dashboard } meals={ [] } /></StaticRouter>);

        expect(wrapper.find('Redirect').exists()).toBe(false);
        expect(wrapper.find('Dashboard').exists()).toBe(true);
    });

    it('should redirect if the user is not logged in.', function() {
        sandbox.replaceGetter(authStatus, 'loggedIn', () => false);

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/meh"><ProtectedRoute path="/meh" component={ Dashboard } meals={ [] } /></StaticRouter>);

        expect(wrapper.find('Redirect').exists()).toBe(true);
        expect(wrapper.find('Dashboard').exists()).toBe(false);
    });
});