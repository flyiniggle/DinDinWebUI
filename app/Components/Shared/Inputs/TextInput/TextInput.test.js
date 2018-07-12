import React from 'react';
import { shallow } from 'enzyme';

import TextInput, { getErrorState } from './TextInput';

describe('#Components #Shared #Inputs #TextInput', function() {
    describe('#getErrorState', function() {
        it('should return an error level state if given an error message.', function() {
            const input = {
                errorMessage: 'Error!',
                warningMessage: '',
                infoMessage: ''
            };
            const expected = {
                message: 'Error!',
                messageClass: 'err',
                inputClass: 'err'
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
                messageClass: 'warn',
                inputClass: 'warn'
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
                messageClass: 'info',
                inputClass: 'info'
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
                messageClass: 'err',
                inputClass: 'err'
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
                messageClass: 'warn',
                inputClass: 'warn'
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
    });
});