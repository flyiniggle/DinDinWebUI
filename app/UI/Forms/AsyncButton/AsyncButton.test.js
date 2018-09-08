import React from 'react';
import { shallow } from 'enzyme';
import AsyncButton from 'UI/Forms/AsyncButton/AsyncButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('#UI #Forms #AsyncButton', function() {
    it('should render button contents when not active.', function() {
        const wrapper = shallow(<AsyncButton>HOOOOO DOGGY</AsyncButton>);

        expect(wrapper.text()).toEqual('HOOOOO DOGGY');
    });

    it('should render a loading icon when active.', function() {
        const wrapper = shallow(<AsyncButton>HOOOOO DOGGY</AsyncButton>);

        wrapper.setState({ working: true });
        expect(wrapper.find(FontAwesomeIcon).exists()).toBe(true);
    });

    it('should call a click handler if provided.', function() {
        const spy = jest.fn();
        const wrapper = shallow(<AsyncButton onClick={ spy }>ok</AsyncButton>);

        wrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});