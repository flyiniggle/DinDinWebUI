import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'babel-polyfill';
import DinDin from 'Components/DinDin/DinDin';

import 'Styles/FA';
import 'Styles/core.sass';

ReactDOM.render((
    <BrowserRouter>
        <DinDin />
    </BrowserRouter>
), document.getElementById('root'));