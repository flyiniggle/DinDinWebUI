import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'babel-polyfill';

import DinDin from 'DinDin/DinDin';

import 'DinDin/Styles/bootstrap.scss';

ReactDOM.render((
    <BrowserRouter>
        <DinDin />
    </BrowserRouter>
), document.getElementById('root'));