import {configure} from '@storybook/react';
import 'Styles/core.sass';

function loadStories() {
    require('./stories/index.js');
    require('./stories/TextInput.stories.js');
}

configure(loadStories, module);