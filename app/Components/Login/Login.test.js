import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import React from 'react';
import { shallow } from 'enzyme';
import { fake, replace, restore, createSandbox } from 'sinon';
import { Result } from 'true-myth';
import Service from 'Business/Auth/Service';
import authStatus from 'Business/Auth/authStatus';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';

import Login from './Login';

describe('#Components #Login #Login', function() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTM2MDYzOTQ1LCJlbWFpbCI6ImFkbWluQGRpbmRpbi5jb20ifQ.XE1L9rd1akii_Y6Kv-YqG0xgdKgmtw1OgWjL8BWHC_o';
    let authServiceSpy;
    let sandbox;

    beforeEach(function() {
        authServiceSpy = fake.resolves(Result.ok({ token: '12345' }));
        replace(Service, 'post', authServiceSpy);

        sandbox = createSandbox();
        authStatus.authToken = false;
    });

    afterEach(function() {
        sandbox.restore();
        restore();
    });

    it('should render.', function() {
        expect(() => shallow(<Login />)).not.toThrow();
    });

    it('should have an error message if the user tries to login without a username.', function() {
        const wrapper = shallow(<Login />);

        wrapper.setState({ password: 'test' });
        expect.assertions(2);
        return wrapper.instance().login().then(function() {
            expect(wrapper.state()).toHaveProperty('usernameError.errorLevel', ErrorLevel.error);
            expect(wrapper.state()).toHaveProperty('usernameError.message', 'required');
        });
    });

    it('should have an error message if the user tries to login without a password.', function() {
        const wrapper = shallow(<Login />);

        wrapper.setState({ username: 'test' });
        expect.assertions(2);
        return wrapper.instance().login().then(function() {
            expect(wrapper.state()).toHaveProperty('passwordError.errorLevel', ErrorLevel.error);
            expect(wrapper.state()).toHaveProperty('passwordError.message', 'required');
        });
    });

    it('should have an error message if it receives a server message rejecting the credentials.', function() {
        const wrapper = shallow(<Login />);
        const serviceFake = fake.resolves(Result.err({ non_field_errors: ['Unable to log in with provided credentials.'] }));

        restore();
        replace(Service, 'post', serviceFake);

        wrapper.setState({ username: 'testUsername', password: 'testPassword' });
        expect.assertions(2);
        return wrapper.instance().login().then(function() {
            expect(wrapper.state()).toHaveProperty('passwordError.errorLevel', ErrorLevel.error);
            expect(wrapper.state()).toHaveProperty('passwordError.message', 'Username and password did not match.');
        });
    });

    it('should request an auth token.', function() {
        const wrapper = shallow(<Login />);
        const data = { username: 'testUsername', password: 'testPassword' };
        authStatus.logOut();

        wrapper.setState(data);
        wrapper.find(AsyncButton).simulate('click');

        expect(authServiceSpy.calledWith(data)).toBe(true);
    });

    describe('#Auth redirect', function() {
        it('should redirect to the dashboard if the user is logged in.', function() {
            sandbox.restore();
            authStatus.authToken = token;

            const wrapper = shallow(<Login />);

            expect(wrapper.find('Redirect').exists()).toBe(true);
        });

        it('should not redirect if the user is not logged in.', function() {
            authStatus.logOut();
            const wrapper = shallow(<Login />);

            expect(wrapper.find('Redirect').exists()).toBe(false);
        });
    });
});