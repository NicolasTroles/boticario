// Modules
import React, { Component } from 'react';
import { getFormValues, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import validate from '../../utils/formValidation';

// Components
import {
    Row,
    Col,
    Form,
    FormGroup,
    Card,
    Button,
    Label,
    CardBody,
    CardTitle,
} from 'reactstrap';
import { SyncLoader } from 'react-spinners';
import Input from '../../components/Input/Input';

// Types
import { SHOW_TOAST } from '../../redux/toast/types';

const Title = styled('h1')`
    font-size: 40px;
    text-align: center;
    margin: 30px 0 10px;
    color: #333;
`

const CardTitleStyled = styled(CardTitle)`
    font-size: 20px;
    color: #333;
    font-weight: 300;
    text-align: center;
    border-top: 1px solid #eaeaea;
    padding: 20px 0 10px;
    p {
        color: #999;
        font-size: 12px;
        margin: 0;
    }
`

const ButtonStyled = styled(Button)`
    width: 100%;
    margin: 25px 0 10px;
    display: flex !important;
    justify-content: center;
    > div {
        margin-left: 10px;
    }
`


const FieldStyled = styled(Field)`
    display: block;
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
`

class ForgotPassword extends Component {
    state = {
        buttonDisabled: false,
        loadingLogin: false,
    }

    onRetrievePassword = () => {
        const { props: { history, formValues } } = this;

        this.setState({
            buttonDisabled: true,
            loadingLogin: true,
        });

        if (!formValues || !formValues.email) {
            setTimeout(() => {
                this.showToast('Preencha o seu email', 'error');
                this.setState({ buttonDisabled: false, loadingLogin: false, })
            }, 1000);
        } else {

            setTimeout(() => {
                this.setState({ buttonDisabled: false, loadingLogin: false, })
                this.showToast('Em alguns instantes você receberá um email, favor verificar sua caixa de entrada!', 'success');
                history.push('/login');
            }, 1000);
        }
    }

    showToast = (message, type) => {
        const { props: { dispatch } } = this;
        dispatch({
            type: SHOW_TOAST.REQUEST,
            newMessage: message,
            messageType: type,
        });
    }

    render() {
        const { state, props: { invalid } } = this;

        return (
            <Form>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 5, offset: 3 }}>
                            <Card>
                                <Title>Boticário</Title>
                                <CardBody>
                                    <CardTitleStyled color='secondary'>
                                        Esqueceu sua senha?
                                        <p>
                                            <Link to='login'>
                                                Voltar
                                            </Link>
                                        </p>
                                        <p>Preencha seu email abaixo que logo lhe enviaremos instruções para recuperar sua senha.</p>
                                    </CardTitleStyled>
                                    <FormGroup>
                                        <Label for="email">Email:</Label>
                                        <FieldStyled
                                            name="email"
                                            component={Input}
                                            id="email"
                                            type="text"
                                            placeholder="Digite seu email..."
                                        />
                                    </FormGroup>

                                    <ButtonStyled disabled={state.buttonDisabled || invalid} onClick={this.onRetrievePassword}>
                                        Recuperar
                                        <SyncLoader
                                            size={7}
                                            color={'#555'}
                                            loading={state.loadingLogin}
                                        />
                                    </ButtonStyled>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Form>
        );
    }
}

ForgotPassword = reduxForm({
    form: 'forgotPassword',
    validate,
})(ForgotPassword)

function mapStateToProps(state) {
    return {
        formValues: getFormValues('forgotPassword')(state),
    }
}

export default withRouter(connect(mapStateToProps)(ForgotPassword));