import * as React from 'react';
import { mount } from 'enzyme'
import EditableList, { IEditableListProps } from 'UI/Forms/EditableList/EditableList';
import ListItem from 'UI/Forms/EditableList/ListItem';
import ListItemAdder from 'UI/Forms/EditableList/ListItemAdder';

describe('#UI #Forms #EditableList #EditableList', function () {
    it('should render a list of items', function () {
        const list = ['cavalli', 'pesce', 'gatti', 'ucceli'];
        const props: IEditableListProps = {
            list,
            onChange: () => null
        }
        const wrapper = mount(<EditableList {...props} />);
        const listItems = wrapper.find(ListItem);

        expect(listItems).toHaveLength(4);
    });

    it('should render a list item adder.', function () {
        const list = ['fredo', 'caldo'];
        const props: IEditableListProps = {
            list,
            onChange: () => null
        }
        const wrapper = mount(<EditableList {...props} />);
        const adder = wrapper.find(ListItemAdder);

        expect(adder.exists()).toEqual(true);
    });

    it('should call the change handler with an updated list when addItem is called.', function () {
        const expectedList = ['cavalli', 'pesce', 'gatti', 'ucceli'];
        const list = ['cavalli', 'pesce', 'gatti'];
        const spy = jest.fn();
        const props: IEditableListProps = {
            list,
            onChange: spy
        };
        const wrapper = mount(<EditableList {...props} />);

        wrapper.instance().addItem('ucceli');

        expect(spy).toHaveBeenCalledWith(expectedList);
    });

    it('should call the change handler with an updated list when removeItem is called.', function () {
        const list = ['cavalli', 'pesce', 'gatti', 'ucceli'];
        const expectedList = ['cavalli', 'pesce', 'gatti'];
        const spy = jest.fn();
        const props: IEditableListProps = {
            list,
            onChange: spy
        };
        const wrapper = mount(<EditableList {...props} />);

        wrapper.instance().removeItem(3);

        expect(spy).toHaveBeenCalledWith(expectedList);
    });
});