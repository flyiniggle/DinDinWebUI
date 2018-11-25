import * as React from 'react';
import { shallow } from 'enzyme';

import DisplayNotes from './DisplayNotes';

describe('#Components #Meal #DisplayOrEditNotes #DisplayNotes', function() {
    it('should display the value if one is provided', function() {
        const wrapper = shallow(<DisplayNotes value="wheeeee" />);

        expect(wrapper.text()).toEqual('wheeeee');
    });

    it('should display placeholder text if no value is give.', function() {
        const wrapper = shallow(<DisplayNotes />);

        expect(wrapper.text()).toEqual('add a note');
    });

    it('should format placeholder text correctly.', function() {
        const wrapper = shallow(<DisplayNotes />);

        expect(wrapper.hasClass('display-notes-placeholder')).toEqual(true);
    });
});