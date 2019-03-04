import React from 'react';
import {shallow } from 'enzyme';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';

import AlertBar from './AlertBar';

describe('#UI #AlertBar #AlertBar', function() {
    it('should return a success alert bar.', function() {
        const wrapper = shallow(<AlertBar level={ ErrorLevel.ok }>heya!</AlertBar>);

        expect(wrapper.find('.alert-success').exists()).toBe(true);
    });

    it('should return an info alert bar.', function() {
        const wrapper = shallow(<AlertBar level={ ErrorLevel.info }>heya!</AlertBar>);

        expect(wrapper.find('.alert-info').exists()).toBe(true);
    });

    it('should return a warning alert bar.', function() {
        const wrapper = shallow(<AlertBar level={ ErrorLevel.warning }>heya!</AlertBar>);

        expect(wrapper.find('.alert-warning').exists()).toBe(true);
    });

    it('should return a failure alert bar.', function() {
        const wrapper = shallow(<AlertBar level={ ErrorLevel.error }>heya!</AlertBar>);

        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    it('shouldrender children.', function() {
        const wrapper = shallow(<AlertBar level={ ErrorLevel.error }>heya!</AlertBar>);

        expect(wrapper.childAt(0).text()).toEqual('heya!');
    });
});