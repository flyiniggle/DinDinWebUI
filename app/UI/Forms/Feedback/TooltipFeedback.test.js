import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import React from 'react';
import {shallow} from 'enzyme';

import TooltipFeedback from './TooltipFeedback';

describe('#UI #Forms #Feedback #TooltipFeedback', function() {

    it('should show an error feedback.', function() {
        const error = new InputMessage({message: 'wrong!', type: ErrorLevel.error});
        const wrapper = shallow(<TooltipFeedback { ...error } active />);

        expect(wrapper.find('.alert-danger').exists()).toBe(true);
        expect(wrapper.text()).toEqual('wrong!');
    });

    it('should show an warning feedback.', function() {
        const warning = new InputMessage({message: 'watch out', type: ErrorLevel.warning});
        const wrapper = shallow(<TooltipFeedback { ...warning } active />);

        expect(wrapper.find('.alert-warning').exists()).toBe(true);
        expect(wrapper.text()).toEqual('watch out');
    });

    it('should show an info feedback.', function() {
        const info = new InputMessage({message: 'hey man', type: ErrorLevel.info});
        const wrapper = shallow(<TooltipFeedback { ...info } active />);

        expect(wrapper.find('.alert-info').exists()).toBe(true);
        expect(wrapper.text()).toEqual('hey man');
    });

    it('should be visible when active.', function() {
        const message = new InputMessage({
            message: 'this is a really long message and should be way wider than the input itself',
            type: ErrorLevel.info
        });
        const wrapper = shallow(<TooltipFeedback { ...message } active />);

        expect(wrapper.find('.tooltipFeedback').exists()).toBe(true);
    });

    it('should be hidden when not active.', function() {

        const message = new InputMessage({
            message: 'this is a really long message and should be way wider than the input itself',
            type: ErrorLevel.info
        });
        const wrapper = shallow(<TooltipFeedback { ...message } />);

        expect(wrapper.find('.tooltipFeedback').exists()).toBe(false);
    });
});