import React from 'react';
import { shallow } from 'enzyme';

import Login from './Login';

describe('#Components #Login #Login', function() {
    it('should render.', function() {
        expect(() => shallow(<Login />)).not.toThrow();
    });
});