import ErrorLevel from 'Business/Validation/Types/ErrorLevel';
import InputMessage from 'DinDin/UI/Forms/Validation/InputMessage';
import React from 'react';
import { shallow } from 'enzyme';

import TextInput from './TextInput';
import './TextInput.sass';

describe('#UI #Form #TextInput', function() {

    describe('#Integration', function() {
        it('should render.', function() {
            const input = shallow(<TextInput />);

            expect(input.exists('input[type="text"]')).toEqual(true);
        });

        it('should render a placeholder.', function() {
            const placeholder = 'enter text';
            const input = shallow(<TextInput placeholder={ placeholder } />);

            expect(input.find('input[type="text"]').prop('placeholder')).toEqual(placeholder);
        });

        it('should render a value.', function() {
            const value = 'enter text';
            const input = shallow(<TextInput value={ value } />);

            expect(input.find('input[type="text"]').prop('value')).toEqual(value);
        });

        describe('#Errors', function() {
            it('should display an error state.', function() {
                const error = new InputMessage({message: 'wrong!', type: ErrorLevel.error});
                const input = shallow(<TextInput value="bad input" message={ error } />);

                expect(input.find('input[type="text"]').closest('is-invalid').exists()).toBe(true);
                expect(input.find('span').hasClass('errorMessage')).toBe(true);
                expect(input.find('span').text()).toBe(error.message);
            });

            it('should display a warning state.', function() {
                const warning = new InputMessage({message: 'watch out', type: ErrorLevel.warning});
                const input = shallow(<TextInput value="weird input" message={ warning } />);

                expect(input.find('input[type="text"]').hasClass('is-invalid')).toBe(true);
                expect(input.find('span').hasClass('warningMessage')).toBe(true);
                expect(input.find('span').text()).toBe(warning.message);
            });

            it('should display an info state.', function() {
                const info = new InputMessage({message: 'hey man', type: ErrorLevel.info});
                const input = shallow(<TextInput value="just some input" message={ info } errorLevel={ ErrorLevel.info } />);

                expect(input.find('input[type="text"]').hasClass('is-invalid')).toBe(true);
                expect(input.find('span').hasClass('infoMessage')).toBe(true);
                expect(input.find('span').text()).toBe(info.message);
            });

            it('should display a normal state.', function() {
                const input = shallow(<TextInput value="just some input" />);

                expect(input.find('input[type="text"]').hasClass('is-invalid')).toBe(false);
                expect(input.find('input[type="text"]').hasClass('warningInput')).toBe(false);
                expect(input.find('input[type="text"]').hasClass('errorInput')).toBe(false);
                expect(input.find('span').exists()).toBe(false);
            });
        });
    });
});