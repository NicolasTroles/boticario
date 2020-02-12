// Modules
import React, { Component } from 'react';
import { getFormValues, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import validate from 'utils/formValidation';
import { translate } from 'react-translate';
import PropTypes from 'prop-types'

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
    Container,
} from 'reactstrap';
import { SyncLoader } from 'react-spinners';
import Input from 'components/Input/Input';

// Types
import { SHOW_TOAST } from 'redux/toast/types';
import { TOKEN_DECODED } from 'redux/authentication/types';

// Aqui aplicaria o Design System com o tema do styled components em todos os componentes.
const Title = styled('h1')`
    ${({ theme }) => `
        font-size: ${theme.fontSize.px40};
        text-align: center;
        margin: 30px 0 10px;
        color: ${theme.colors.grey1};
`};`

const CardTitleStyled = styled(CardTitle)`
    ${({ theme }) => `
        font-size: 20px;
        color: ${theme.colors.grey1};
        font-weight: 300;
        text-align: center;
        border-top: 1px solid #eaeaea;
        padding: 20px 0 10px;
        p {
            color: #999;
            font-size: 12px;
            margin: 0;
        }
    `};`


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

class LoginForm extends Component {
    state = {
        buttonDisabled: false,
        loadingLogin: false,
    }

    onLogin = () => {
        const { props: { dispatch, t, formValues, history } } = this;

        this.setState({
            buttonDisabled: true,
            loadingLogin: true,
        });


        setTimeout(() => {
            let users = localStorage.getItem('users');
            if (!users) {
                this.showToast(t('USER_NOT_REGISTERED'), 'warning');
            } else {
                users = JSON.parse(users);

                const user = users.find(user => user.email === formValues.email);

                if (user) {
                    if (user.password === formValues.password) {
                        // Após o login pegaria o token da api e colocaria as informações decodadas no redux
                        dispatch({
                            type: TOKEN_DECODED.SUCCESS,
                            tokenDecoded: user,
                        });
                        this.showToast(t('SUCCESS_LOGIN'), 'success');
                        localStorage.setItem('token', JSON.stringify(user));
                        history.push('/');
                    } else {
                        this.showToast(t('INCORRECT_PASSWORD'), 'error');
                    }
                } else {
                    this.showToast(t('USER_NOT_REGISTERED'), 'warning');
                }
                this.setState({ buttonDisabled: false, loadingLogin: false });
            }
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
        const { state, props: { t, invalid } } = this;

        return (
            <Form>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 5, offset: 3 }}>
                            <Card>
                                <Title data-testid='title'>Boticário</Title>
                                <CardBody>
                                    <CardTitleStyled color='secondary'>
                                        Login
                                        <p>
                                            {t('FORGOT_PASSWORD')} <Link to='forgotPassword'>
                                                {t('CLICK_HERE')}
                                            </Link>
                                        </p>
                                        <p>
                                            {t('NOT_REGISTERED')} <Link to='register'>
                                                {t('CLICK_HERE')}
                                            </Link>
                                        </p>
                                    </CardTitleStyled>
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
                                        <Label for="email">{t('PASSWORD')}:</Label>
                                        <FieldStyled type="password"
                                            component={Input}
                                            name="password"
                                            id="password"
                                            placeholder={t('TYPE_PASSWORD')} />
                                    </FormGroup>

                                    <ButtonStyled disabled={state.buttonDisabled || invalid} onClick={this.onLogin}>
                                        {t('LOGIN')}
                                        {state.loadingLogin &&
                                            <div data-testid='loader'>
                                                <SyncLoader
                                                    size={7}
                                                    color={'#555'}
                                                    loading={state.loadingLogin}
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

LoginForm = reduxForm({
    form: 'loginForm',
    validate,
})(LoginForm)

function mapStateToProps(state) {
    return {
        formValues: getFormValues('loginForm')(state),
    }
}

LoginForm.propTypes = {
    t: PropTypes.func,
}

LoginForm.defaultProps = {
    t: () => { },
}

export default withRouter(translate('Login')(connect(mapStateToProps)(LoginForm)));