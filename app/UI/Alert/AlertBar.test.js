import React from 'react';
import {shallow } from 'enzyme';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import OkMessage from 'Business/Validation/OkMessage';

import AlertBar from './AlertBar';

describe('#UI #AlertBar #AlertBar', function() {
    it('should display a message.', function() {
        const messageText = 'everything is going to be ok.';
        const message = new OkMessage({ message: messageText });
        const wrapper = shallow(<AlertBar message={ message } />);
        const html = wrapper.html();

        expect(RegExp(messageText).test(html)).toBe(true);
    });

    it('should use the message\'s error type.', function() {
        const messageText = 'everything is going to be ok.';
        const message = new OkMessage({ message: messageText });
        const wrapper = shallow(<AlertBar message={ message } />);

        expect(wrapper.find('.alert-success').exists()).toBe(true);
    });

    it('shoud show a button to dismiss the message.', function() {
        const clickSpy = jest.fn();
        const messageText = 'everything is going to be ok.';
        const message = new OkMessage({ message: messageText });
        const wrapper = shallow(<AlertBar message={ message } dismissMessage={ clickSpy } />);
        const button = wrapper.find('button');

        button.simulate('click');

        expect(clickSpy).toHaveBeenCalled();
    });

    it('should return a success alert bar.', function() {
        const wrapper = shallow(<AlertBar type={ ErrorLevel.ok }>heya!</AlertBar>);

        expect(wrapper.find('.alert-success').exists()).toBe(true);
    });

    it('should return an info alert bar.', function() {
        const wrapper = shallow(<AlertBar type={ ErrorLevel.info }>heya!</AlertBar>);

        expect(wrapper.find('.alert-info').exists()).toBe(true);
    });

    it('should return a warning alert bar.', function() {
        const wrapper = shallow(<AlertBar type={ ErrorLevel.warning }>heya!</AlertBar>);

        expect(wrapper.find('.alert-warning').exists()).toBe(true);
    });

    it('should return a failure alert bar.', function() {
        const wrapper = shallow(<AlertBar type={ ErrorLevel.error }>heya!</AlertBar>);

        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    it('shouldrender children.', function() {
        const wrapper = shallow(<AlertBar type={ ErrorLevel.error }>heya!</AlertBar>);

        expect(wrapper.childAt(0).text()).toEqual('heya!');
    });
});