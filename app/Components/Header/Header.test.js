import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('#Components #Header #Header', function() {
    it('should render.', function() {
        const wrapper = shallow(<Header />);

        expect(wrapper.html()).toMatchSnapshot();
    });
});