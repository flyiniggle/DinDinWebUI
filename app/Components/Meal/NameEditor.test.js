import React from 'react';
import { mount } from 'enzyme';
import NameEditor from 'Components/Meal/NameEditor';


describe('#Components #Meal #NameEditor', function() {
    it('should call the onSave handler when the user clicks save.', function() {
        const props = {
            name: 'test meal',
            onChange: jest.fn(),
            onSave: jest.fn(),
            onCancel: jest.fn()
        };
        const wrapper = mount(<NameEditor { ...props } />);

        wrapper.find('button.field-control-save').simulate('click');

        expect(props.onSave).toHaveBeenCalled();
    });

    it('should call the onCancel handler when the user clicks cancel.', function() {
        const props = {
            name: 'test meal',
            onChange: jest.fn(),
            onSave: jest.fn(),
            onCancel: jest.fn()
        };
        const wrapper = mount(<NameEditor { ...props } />);

        wrapper.find('button.field-control-cancel').simulate('click');

        expect(props.onCancel).toHaveBeenCalled();
    });

    it('should show the name in the text input.', function() {
        const props = {
            name: 'test meal',
            onChange: jest.fn(),
            onSave: jest.fn(),
            onCancel: jest.fn()
        };
        const wrapper = mount(<NameEditor { ...props } />);


        expect(wrapper.find(`input[value="${props.name}"]`).exists()).toEqual(true);
    });
});