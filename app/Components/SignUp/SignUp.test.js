import SignUp from  './SignUp';
import React from 'react';
import { shallow } from 'enzyme';

describe("#Components #Signup", function() {
    it('should render.', function() {
        const wrapper = shallow(<SignUp/>);

        expect(wrapper.html()).toMatchSnapshot();
    })
})