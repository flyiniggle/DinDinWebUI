import React from 'react';
import { shallow } from 'enzyme';

import SignUp from './SignUp';

describe('#Components #Signup', function() {
    it('should render.', function() {
        const wrapper = shallow(<SignUp />);

        expect(wrapper.html()).toMatchSnapshot();
    });
});