import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InlineFeedback from 'DinDin/UI/Forms/Feedback/InlineFeedback';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import React from 'react';
import { shallow } from 'enzyme';

import './InlineFeedback';


describe('#UI #Forms #InlineFeedback', function() {
    it('should show an error feedback.', function() {
        const error = new InputMessage({message: 'wrong!', type: ErrorLevel.error});
        const wrapper = shallow(<InlineFeedback { ...error } />);

        expect(wrapper.find('.error-text').exists()).toBe(true);
        expect(wrapper.text()).toEqual('wrong!');
    });

    it('should show an warning feedback.', function() {
        const warning = new InputMessage({message: 'watch out', type: ErrorLevel.warning});
        const wrapper = shallow(<InlineFeedback { ...warning } />);

        expect(wrapper.find('.warning-text').exists()).toBe(true);
        expect(wrapper.text()).toEqual('watch out');
    });

    it('should show an info feedback.', function() {
        const info = new InputMessage({message: 'hey man', type: ErrorLevel.info});
        const wrapper = shallow(<InlineFeedback { ...info } />);

        expect(wrapper.find('.info-text').exists()).toBe(true);
        expect(wrapper.text()).toEqual('hey man');
    });
});