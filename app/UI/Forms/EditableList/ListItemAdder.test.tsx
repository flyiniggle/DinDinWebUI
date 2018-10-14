import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ListItemAdder, { IListItemAdder } from 'UI/Forms/EditableList/ListItemAdder';

describe('#UI #Forms #EditableList #ListItemAdder', function() {
    it('should render', function () {
        const props: IListItemAdder = {
            addHandler: () => null
        }
        const wrapper = shallow(<ListItemAdder {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    // it('should call addHandler with current state value when the add button is clicked.', function () {
    //     const spy = jest.fn()
    //     const props: IListItemAdder = {
    //         addHandler: spy
    //     }
    //     const text = 'hooah!'
    //     const wrapper = shallow(<ListItemAdder {...props} />);

    //     wrapper.setState({ val: text });
    //     wrapper.find('.btn').simulate('click')

    //     expect(spy).toHaveBeenCalledWith(text);
    // })
});