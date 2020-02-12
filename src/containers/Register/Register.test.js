import React from 'react';
import { render, cleanup, fireEvent } from 'test/provider';

import Register from './Register';

afterEach(cleanup);

test('<Register /> - Testando registro', () => {

    const { getByPlaceholderText, getByRole, getByTestId } = render(<Register />);

    const name = getByPlaceholderText('Type your full name...');
    const email = getByPlaceholderText('Type your email...');
    const password = getByPlaceholderText('Type your password...');
    const cpf = getByPlaceholderText('Type your CPF...');
    const button = getByRole('button');

    fireEvent.change(name, { target: { value: 'Nome completo' } });
    fireEvent.change(email, { target: { value: 'email@email.com' } });
    fireEvent.change(password, { target: { value: 'senha' } });
    fireEvent.change(cpf, { target: { value: '12345678912' } });

    expect(name.value).toBe('Nome completo');
    expect(email.value).toBe('email@email.com');
    expect(password.value).toBe('senha');
    expect(cpf.value).toBe('123.456.789.12');
    expect(button).toBeEnabled();

    fireEvent.click(button);

    const loader = getByTestId('loader');

    expect(loader).toBeTruthy();
});


test('<Register /> - Testando falta de preenchimento de algum campo', () => {

    const { getByPlaceholderText, getByRole, queryByTestId, rerender } = render(<Register />);

    const name = getByPlaceholderText('Type your full name...');
    const email = getByPlaceholderText('Type your email...');
    const password = getByPlaceholderText('Type your password...');
    const cpf = getByPlaceholderText('Type your password...');
    const button = getByRole('button');

    fireEvent.change(name, { target: { value: 'Nome completo' } });
    fireEvent.change(email, { target: { value: 'email@email.com' } });

    expect(name.value).toBe('Nome completo');
    expect(email.value).toBe('email@email.com');
    expect(password.value).toBe('');
    expect(cpf.value).toBe('');
    expect(button).toBeDisabled();

    // Aqui poderia fazer um rerender para testar o não preenchimento de todos os campos

    fireEvent.click(button);

    const loader = queryByTestId('loader');

    expect(loader).toBeFalsy();
});
