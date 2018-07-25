import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import React from 'react';
import { shallow } from 'enzyme';
import { fake, replace, restore, stub } from 'sinon';
import Service from 'Business/Auth/Service';

import Login from './Login';

describe('#Components #Login #Login', function() {
    const authServiceSpy = fake.resolves('12345');

    beforeAll(function() {
        stub(Service, 'get').callsFake(authServiceSpy);
    });

    it('should render.', function() {
        expect(() => shallow(<Login />)).not.toThrow();
    });

    it('should have an error message if the user tries to login without a username.', function() {
        const wrapper = shallow(<Login />);

        wrapper.setState({password: 'test'});
        expect.assertions(2);
        wrapper.instance().login().then(function() {
            expect(wrapper.state()).toHaveProperty('usernameError.errorLevel', ErrorLevel.error);
            expect(wrapper.state()).toHaveProperty('usernameError.message', 'required');
        });
    });

    it('should have an error message if the user tries to login without a password.', function() {
        const wrapper = shallow(<Login />);

        wrapper.setState({username: 'test'});
        expect.assertions(2);
        wrapper.instance().login().then(function() {
            expect(wrapper.state()).toHaveProperty('passwordError.errorLevel', ErrorLevel.error);
            expect(wrapper.state()).toHaveProperty('passwordError.message', 'required');
        });
    });

    it('should have an error message if it receives a server message rejecting the credentials.', function() {
        const wrapper = shallow(<Login />);
        const serviceFake = fake.resolves({non_field_errors: ['Unable to log in with provided credentials.']});

        replace(Service, 'get', serviceFake);

        wrapper.setState({username: 'testUsername', password: 'testPassword'});
        expect.assertions(2);
        wrapper.instance().login().then(function() {
            expect(wrapper.state()).toHaveProperty('passwordError.errorLevel', ErrorLevel.error);
            expect(wrapper.state()).toHaveProperty('passwordError.message', 'Username and password did not match.');
        });

        restore();
    });

    it('should request an auth token.', function() {
        const wrapper = shallow(<Login />);

        wrapper.setState({username: 'testUsername', password: 'testPassword'});
        wrapper.find('input[type="button"]').simulate('click');

        expect(authServiceSpy.calledWith('testUsername', 'testPassword')).toBe(true);
    });
});