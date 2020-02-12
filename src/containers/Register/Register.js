// Modules
import React, { Component } from 'react';
import { getFormValues, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import validate from '../../utils/formValidation';
import { translate } from 'react-translate';
import { createTextMask } from 'redux-form-input-masks';

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
import { SHOW_TOAST } from 'redux/toast/types';


const cpfMask = createTextMask({
    pattern: '999.999.999.99',
});

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

class Register extends Component {
    state = {
        buttonDisabled: false,
        loadingRegister: false,
    }

    onRegister = () => {
        const { props: { t, formValues } } = this;

        this.setState({
            buttonDisabled: true,
            loadingRegister: true,
        });

        let users = localStorage.getItem('users');
        let newUser = {
            name: formValues.name,
            email: formValues.email,
            cpf: formValues.cpf,
            password: formValues.password,
        }
        if (users) {
            users = JSON.parse(users);
            newUser = {
                ...newUser,
                id: users.length + 1,
            }
            if (users.some(user => user.email === formValues.email || user.cpf === formValues.cpf)) {
                setTimeout(() => {
                    this.showToast(t('EMAIL_ALREADY_REGISTERED'), 'error');
                    this.setState({ buttonDisabled: false, loadingRegister: false, })
                }, 1000);
            } else {
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                this.success();
            }
        } else {
            newUser = {
                ...newUser,
                id: 1,
            }
            localStorage.setItem('users', JSON.stringify([newUser]));
            this.success();
        }
    }

    success = () => {
        const { props: { history, t } } = this;
        setTimeout(() => {
            this.setState({ buttonDisabled: false, loadingRegister: false, })
            this.showToast(t('SUCCESS_REGISTER'), 'success');
            history.push('/login');
        }, 1000);
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
        const { state, props: { invalid, t } } = this;

        return (
            <Form>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 5, offset: 3 }}>
                            <Card>
                                <Title>Boticário</Title>
                                <CardBody>
                                    <CardTitleStyled color='secondary'>
                                        {t('REGISTER_TITLE')}
                                        <p>
                                            <Link to='login'>
                                                {t('BACK')}
                                            </Link>
                                        </p>
                                        <p>{t('FILL_REGISTER')}</p>
                                    </CardTitleStyled>
                                    <FormGroup>
                                        <Label for="name">{t('FULL_NAME')}:</Label>
                                        <FieldStyled
                                            name="name"
                                            component={Input}
                                            id="name"
                                            type="text"
                                            placeholder={t('TYPE_FULL_NAME')}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email:</Label>
                                        <FieldStyled
                                            name="email"
                                            component={Input}
                                            id="email"
                                            type="text"
                                            placeholder={t('TYPE_EMAIL')}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="cpf">CPF:</Label>
                                        <FieldStyled
                                            name="cpf"
                                            component={Input}
                                            id="cpf"
                                            type="text"
                                            placeholder={t('TYPE_CPF')}
                                            {...cpfMask}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">{t('PASSWORD')}:</Label>
                                        <FieldStyled
                                            name="password"
                                            component={Input}
                                            id="password"
                                            type="password"
                                            placeholder={t('TYPE_PASSWORD')}
                                        />
                                    </FormGroup>

                                    <ButtonStyled disabled={state.buttonDisabled || invalid} onClick={this.onRegister}>
                                        {t('REGISTER')}
                                        {state.loadingRegister &&
                                            <div data-testid='loader'>
                                                <SyncLoader
                                                    size={7}
                                                    color={'#555'}
                                                    loading={state.loadingRegister}
                                                />
                                            </div>
                                        }
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

Register = reduxForm({
    form: 'Register',
    validate,
})(Register)

function mapStateToProps(state) {
    return {
        formValues: getFormValues('Register')(state),
    }
}

export default withRouter(translate('Login')(connect(mapStateToProps)(Register)));