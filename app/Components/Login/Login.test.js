import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import Service from 'Business/Auth/Service';

import Login from './Login';

describe('#Components #Login #Login', function() {
    beforeAll(function() {
        stub(Service, 'get').callsFake(() => undefined);
    });

    it('should render.', function() {
        expect(() => shallow(<Login />)).not.toThrow();
    });
});