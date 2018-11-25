import * as React from 'react';
import { shallow } from 'enzyme';

import EditNotes from './EditNotes';

describe('#Components #Meal #DisplayOrEditNotes #DisplayNotes', function() {
    it('should display the value if one is provided', function() {
        const onChangeSpy = jest.fn();
        const wrapper = shallow(<EditNotes value="wheeeee" onChange={ onChangeSpy } />);

        //expect(wrapper.text()).toEqual('wheeeee');
    });

    it('should call the changehandler when updating the value.', function() {
        const onChangeSpy = jest.fn();
        const wrapper = shallow(<EditNotes onChange={ onChangeSpy } />);

        wrapper.simulate('change');
        expect(onChangeSpy).toHaveBeenCalled();
    });
});