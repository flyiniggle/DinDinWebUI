import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from 'Components/Dashboard/Dashboard';

storiesOf('Dashboard', module)
    .add('just doin it', function() {
        return <Dashboard />;
    });