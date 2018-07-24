import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import Feedback from 'DinDin/UI/Forms/Feedback/Feedback';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import React from 'react';
import { shallow } from 'enzyme';

import './Feedback';


describe('#UI #Forms #Feedback', function() {
    it('should show an error feedback.', function() {
        const error = new InputMessage({message: 'wrong!', type: ErrorLevel.error});
        const wrapper = shallow(<Feedback { ...error } />);

        expect(wrapper.find('.errorMessage').exists()).toBe(true);
        expect(wrapper.text()).toEqual('wrong!');
    });

    it('should show an warning feedback.', function() {
        const warning = new InputMessage({message: 'watch out', type: ErrorLevel.warning});
        const wrapper = shallow(<Feedback { ...warning } />);

        expect(wrapper.find('.warningMessage').exists()).toBe(true);
        expect(wrapper.text()).toEqual('watch out');
    });

    it('should show an info feedback.', function() {
        const info = new InputMessage({message: 'hey man', type: ErrorLevel.info});
        const wrapper = shallow(<Feedback { ...info } />);

        expect(wrapper.find('.infoMessage').exists()).toBe(true);
        expect(wrapper.text()).toEqual('hey man');
    });
});