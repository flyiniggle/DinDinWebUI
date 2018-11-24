import React from 'react';
import { mount, shallow } from 'enzyme';
import MealEditorControl from 'Components/MealEditor/MealEditorControl';
import editableFields from 'Components/Meal/Types/editableFields';


describe('#Components #MealEditor #MealEditorControl', function() {
    describe('#activateEditor', function() {
        it('should set the activeField state.', function() {
            const mockControlledComponent = jest.fn();

            mockControlledComponent.mockReturnValue(<div />);

            const MockMealEditor = MealEditorControl(mockControlledComponent);
            const wrapper = mount(<MockMealEditor />);

            wrapper.instance().activateEditor(editableFields.name, 'yummy meal');

            expect(wrapper.state('activeField')).toEqual(editableFields.name);
        });

        it('should set the activeFieldValue state.', function() {
            const mockControlledComponent = jest.fn();

            mockControlledComponent.mockReturnValue(<div />);

            const MockMealEditor = MealEditorControl(mockControlledComponent);
            const wrapper = mount(<MockMealEditor />);

            wrapper.instance().activateEditor(editableFields.name, 'yummy meal');

            expect(wrapper.state('activeFieldValue')).toEqual('yummy meal');
        });
    });

    describe('#cancelEditing', function() {
        it('should clear the activeField and activeFieldValue state.', function() {
            const mockControlledComponent = jest.fn();

            mockControlledComponent.mockReturnValue(<div />);

            const MockMealEditor = MealEditorControl(mockControlledComponent);
            const wrapper = mount(<MockMealEditor />);

            wrapper.setState({ activeField: editableFields.notes, activeFieldValue: 'lala' });
            wrapper.instance().cancelEditing(new Event('click'));

            expect(wrapper.state('activeField')).toEqual(null);
            expect(wrapper.state('activeFieldValue')).toEqual(null);
        });
    });
});