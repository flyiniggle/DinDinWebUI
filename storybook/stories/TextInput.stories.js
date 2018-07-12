import React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from 'Components/Shared/Inputs/TextInput/TextInput';

storiesOf('Inputs/TextInput', module)
    .add('Render', function() {
        return <TextInput />;
    })
    .add('show a placeholder', function() {
        return <TextInput placeholder="enter text..." />;
    })
    .add('show a value', function() {
        return <TextInput value="some text" />;
    });