import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import store from 'Data/store';
import DinDin from 'Components/DinDin/DinDin';

import 'Styles/core.sass';


ReactDOM.render((
    <Provider store={ store }>
        <BrowserRouter>
            <DinDin />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));