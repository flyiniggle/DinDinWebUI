import React from 'react';
import { shallow } from 'enzyme';

import TextInput from './TextInput';

describe('#Components #Shared #Inputs #TextInput', function() {
    describe('#Integration', function() {
        it('should render.', function() {
            const input = shallow(<TextInput />);

            expect(input.is('input[type="text"]')).toEqual(true);
        });
    });
});