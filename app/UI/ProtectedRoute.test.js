import authStatus from 'Business/Auth/authStatus';
import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import { createSandbox } from 'sinon';
import TextInput from 'DinDin/UI/Forms/TextInput/TextInput';

import ProtectedRoute from './ProtectedRoute';


describe('#UI #ProtectedRoute', function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';
    const sandbox = createSandbox();

    afterEach(sandbox.restore);

    it('should render the component if the user is logged in.', function() {
        authStatus.authToken = token;

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/meh"><ProtectedRoute path="/meh" component={ TextInput } meals={ [] } /></StaticRouter>);

        expect(wrapper.find('Redirect').exists()).toBe(false);
        expect(wrapper.find('TextInput').exists()).toBe(true);
    });

    it('should redirect if the user is not logged in.', function() {
        authStatus.authToken = '';

        const wrapper = mount(<StaticRouter basename="" context={ {} } location="/meh"><ProtectedRoute path="/meh" component={ TextInput } meals={ [] } /></StaticRouter>);

        expect(wrapper.find('Redirect').exists()).toBe(true);
        expect(wrapper.find('Redirect').props().to.pathname).toEqual('/login');
        expect(wrapper.find('TextInput').exists()).toBe(false);
    });
});