// Modules 
import React from 'react'
import styled from 'styled-components';


// Components
import {
    Card,
} from 'reactstrap';

const Container = styled('div')`
padding: 20px;
    
`

const Value = styled('div')`
    display: flex;
    align-items: flex-end;
padding: 5px;
h3, h5{
        margin: 0;
    }
    h3 {
        width: 150px;
        margin-right: 5px;
    }
`

export default () => {
    return (
        <Card>
            <Container>
                <Value>
                    <h3>Nome: </h3>
                    <h5>Nicolas Otavio Ferreira Troles</h5>
                </Value>
                <Value>
                    <h3>Email: </h3>
                    <h5>nicolastroles95@gmail.com</h5>
                </Value>
                <Value>
                    <h3>Telefone: </h3>
                    <h5>(41) 9 9944 7746</h5>
                </Value>
                <Value>
                    <h3>Endereço: </h3>
                    <h5>Rua Jose Taschner, 374 - Fanny - Curitiba</h5>
                </Value>
                <Value>
                    <h3>Linkedin: </h3>
                    <h5><a href='https://www.linkedin.com/in/nicolastroles/' target='_blank'>https://www.linkedin.com/in/nicolastroles/</a></h5>
                </Value>
            </Container>
        </Card>
    )
}
