import React, { Component } from 'react';

// Router
import { HashRouter, BrowserRouter } from 'react-router-dom';

// Translations
import { TranslatorProvider } from 'react-translate';
import { translationsPT, translationsEN } from 'translate';

// Styles
import { ThemeProvider } from 'styled-components';
import { primaryTheme } from 'styles/theme';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'; // SAGA
import rootReducers from './redux/rootReducers';
import rootSagas from './redux/rootSagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

// run the saga
sagaMiddleware.run(rootSagas);


export default class extends Component {
    render() {
        const {
            props: { children },
        } = this;
        return (
            <Provider store={store}>
                <ThemeProvider theme={primaryTheme}>
                    <HashRouter>
                        <BrowserRouter>
                            <TranslatorProvider translations={navigator.language === 'pt-BR' ? translationsPT : translationsEN}>{children}</TranslatorProvider>
                        </BrowserRouter>
                    </HashRouter>
                </ThemeProvider>
            </Provider>
        );
    }
}
