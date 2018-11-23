import React from 'react';
import { mount } from 'enzyme';
import DisplayOrEditName from 'Components/Meal/DisplayOrEditName/DisplayOrEditName';


describe('#Components #Meal #DisplayOrEditName #DisplayOrEditName', function() {
    it('should call the onSave handler when the user clicks save.', function() {
        const props = {
            active: true,
            editingValue: 'test meal',
            onChange: jest.fn(),
            onSave: jest.fn(),
            onCancel: jest.fn()
        };
        const wrapper = mount(<DisplayOrEditName { ...props } />);

        wrapper.find('button.field-control-save').simulate('click');

        expect(props.onSave).toHaveBeenCalled();
    });

    it('should call the onCancel handler when the user clicks cancel.', function() {
        const props = {
            active: true,
            editingValue: 'test meal',
            onChange: jest.fn(),
            onSave: jest.fn(),
            onCancel: jest.fn()
        };
        const wrapper = mount(<DisplayOrEditName { ...props } />);

        wrapper.find('button.field-control-cancel').simulate('click');

        expect(props.onCancel).toHaveBeenCalled();
    });

    it('should show the name in the text input.', function() {
        const props = {
            active: true,
            editingValue: 'test meal',
            onChange: jest.fn(),
            onSave: jest.fn(),
            onCancel: jest.fn()
        };
        const wrapper = mount(<DisplayOrEditName { ...props } />);

        expect(wrapper.find(`input[value="${props.editingValue}"]`).exists()).toEqual(true);
    });
});