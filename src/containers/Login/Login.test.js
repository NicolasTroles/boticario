import React from 'react';
import { render, cleanup, fireEvent } from 'test/provider';

import Login from './Login';

afterEach(cleanup);

test('<Login /> - Testando login', () => {

    const { getByPlaceholderText, getByRole, getByTestId } = render(<Login />);

    const email = getByPlaceholderText('Type your email...');
    const password = getByPlaceholderText('Type your password...');
    const button = getByRole('button');

    fireEvent.change(email, { target: { value: 'email@email.com' } });
    fireEvent.change(password, { target: { value: 'senha' } });

    expect(email.value).toBe('email@email.com');
    expect(password.value).toBe('senha');
    expect(button).toBeEnabled();

    fireEvent.click(button);

    const loader = getByTestId('loader');

    expect(loader).toBeTruthy();
});


test('<Login /> - Testando falta de preenchimento de algum campo', () => {

    const { getByPlaceholderText, getByRole, queryByTestId } = render(<Login />);

    const email = getByPlaceholderText('Type your email...');
    const password = getByPlaceholderText('Type your password...');
    const button = getByRole('button');

    fireEvent.change(email, { target: { value: 'email@email.com' } });

    expect(email.value).toBe('email@email.com');
    expect(password.value).toBe('');
    expect(button).toBeDisabled();

    fireEvent.click(button);

    const loader = queryByTestId('loader');

    expect(loader).toBeFalsy();
});

