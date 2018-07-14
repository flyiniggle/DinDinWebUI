import React from 'react';
import { shallow } from 'enzyme';

import TextInput, { getErrorState } from './TextInput';
import styles from './TextInput.sass';

describe('#UI #Form #TextInput', function() {
    describe('#getErrorState', function() {
        it('should return an error level state if given an error message.', function() {
            const input = {
                errorMessage: 'Error!',
                warningMessage: '',
                infoMessage: ''
            };
            const expected = {
                message: 'Error!',
                messageClass: styles.errorMessage,
                inputClass: styles.errorInput
            };

            expect(getErrorState(input)).toEqual(expected);
        });

        it('should return an warning level state if given a warning message.', function() {
            const input = {
                errorMessage: '',
                warningMessage: 'Watch out...',
                infoMessage: ''
            };
            const expected = {
                message: 'Watch out...',
                messageClass: styles.warningMessage,
                inputClass: styles.warningInput
            };

            expect(getErrorState(input)).toEqual(expected);
        });

        it('should return an info level state if given a info message.', function() {
            const input = {
                errorMessage: '',
                warningMessage: '',
                infoMessage: 'Hey, fyi...'
            };
            const expected = {
                message: 'Hey, fyi...',
                messageClass: styles.infoMessage,
                inputClass: styles.infoInput
            };

            expect(getErrorState(input)).toEqual(expected);
        });

        it('should return an empty level state if given no message.', function() {
            const input = {
                errorMessage: '',
                warningMessage: '',
                infoMessage: ''
            };
            const expected = {
                message: '',
                messageClass: '',
                inputClass: ''
            };

            expect(getErrorState(input)).toEqual(expected);
        });

        it('should give precedence to error messages over warning and info messages.', function() {
            const input = {
                errorMessage: 'Error!',
                warningMessage: 'not me',
                infoMessage: 'not me either'
            };
            const expected = {
                message: 'Error!',
                messageClass: styles.errorMessage,
                inputClass: styles.errorInput
            };

            expect(getErrorState(input)).toEqual(expected);
        });

        it('should give precedence to warning messages over info messages.', function() {
            const input = {
                errorMessage: '',
                warningMessage: 'Watch out...',
                infoMessage: 'not me'
            };
            const expected = {
                message: 'Watch out...',
                messageClass: styles.warningMessage,
                inputClass: styles.warningInput
            };

            expect(getErrorState(input)).toEqual(expected);
        });
    });

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
                const error = 'wrong!';
                const input = shallow(<TextInput value="bad input" errorMessage={ error } />);

                expect(input.find('input[type="text"]').hasClass(styles.errorInput)).toBe(true);
                expect(input.find('span').hasClass(styles.errorMessage)).toBe(true);
                expect(input.find('span').text()).toBe(error);
            });

            it('should display a warning state.', function() {
                const warning = 'watch out';
                const input = shallow(<TextInput value="weird input" warningMessage={ warning } />);

                expect(input.find('input[type="text"]').hasClass(styles.warningInput)).toBe(true);
                expect(input.find('span').hasClass(styles.warningMessage)).toBe(true);
                expect(input.find('span').text()).toBe(warning);
            });

            it('should display an info state.', function() {
                const info = 'hey man';
                const input = shallow(<TextInput value="just some input" infoMessage={ info } />);

                expect(input.find('input[type="text"]').hasClass(styles.infoInput)).toBe(true);
                expect(input.find('span').hasClass(styles.infoMessage)).toBe(true);
                expect(input.find('span').text()).toBe(info);
            });

            it('should display a normal state.', function() {
                const input = shallow(<TextInput value="just some input" />);

                expect(input.find('input[type="text"]').hasClass(styles.infoInput)).toBe(false);
                expect(input.find('input[type="text"]').hasClass(styles.warningInput)).toBe(false);
                expect(input.find('input[type="text"]').hasClass(styles.errorInput)).toBe(false);
                expect(input.find('span').exists()).toBe(false);
            });
        });
    });
});