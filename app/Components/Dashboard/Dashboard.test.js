import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from './Dashboard';

describe('#Components #Dashboard #Dashboard', function() {
    it('should render.', function() {
        expect(() => shallow(<Dashboard />)).not.toThrow();
    });
});