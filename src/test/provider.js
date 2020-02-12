import React from 'react';
// test-utils.js
import { render } from '@testing-library/react';
import Providers from 'providers';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

// Router
import { Router } from 'react-router-dom';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
    const Wrapper = ({ children }) => (
        <Providers>
            <Router history={history}>{children}</Router>
        </Providers>
    );
    return {
        ...render(ui, { wrapper: Wrapper }),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    };
}

export * from '@testing-library/react';
// re-export everything

// override render method
export { renderWithRouter as render };
