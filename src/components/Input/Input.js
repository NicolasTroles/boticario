
import React from 'react';
import styled from 'styled-components';

const FieldStyled = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    input {
        width: 100%;
        border: 0;
        outline: none;
    }
    span {
        color: red;
        margin: 6px 0 0 -12px;
        font-size: 10px;
    }
`

const Input = ({
    input,
    placeholder,
    type,
    meta: { touched, error, warning }
}) => (
        <FieldStyled>
            <input {...input} placeholder={placeholder} type={type} />
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </FieldStyled>
    )


export default Input;