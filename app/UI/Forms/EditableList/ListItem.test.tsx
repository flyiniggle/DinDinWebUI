import * as React from 'react';
import { shallow } from 'enzyme';
import ListItem, { IListAdder } from 'UI/Forms/EditableList/ListItem';

describe('#UI #Forms #EditableList #ListItem', function() {
    it('should render', function () {
        const props: IListAdder = {
            text: 'test',
            id: 1,
            handleRemove: () => null
        }
        const wrapper = shallow(<ListItem {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should display the provided text.', function () {
        const props: IListAdder = {
            text: 'test',
            id: 1,
            handleRemove: () => null
        }
        const wrapper = shallow(<ListItem {...props} />);
        const textContainer = wrapper.find('.form-control');

        expect(textContainer.text()).toEqual(props.text);
    })

    it('should call handleRemove with the id prop when the remove button is clicked.', function () {
        const spy = jest.fn()
        const props: IListAdder = {
            text: 'test',
            id: 1,
            handleRemove: spy
        }
        const wrapper = shallow(<ListItem {...props} />);

        wrapper.find('.input-group-append').simulate('click', new Event('click'))

        expect(spy).toHaveBeenCalledWith(props.id);
    })
});