// Modules
import 'numeral/locale';
import React from 'react';
import ReactDOM from 'react-dom';

// Routes
import AppRouter from './router/AppRouter';

// Providers
import Providers from 'providers';

ReactDOM.render(
    <Providers>
        <AppRouter />
    </Providers>
    , document.getElementById('root'));
// registerServiceWorker();
