import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'babel-polyfill';

import DinDin from 'DinDin/DinDin';

ReactDOM.render((
    <BrowserRouter>
        <DinDin />
    </BrowserRouter>
), document.getElementById('root'));