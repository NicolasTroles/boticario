// Modules
import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

// Components
import MyInfo from 'containers/MyInfo/MyInfo';
import PurchaseList from 'containers/PurchaseList/PurchaseList';
import Login from 'containers/Login/Login';
import ForgotPassword from 'containers/ForgotPassword/ForgotPassword';
import Register from 'containers/Register/Register';
import Header from 'components/Header/Header'

// Styles
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { TOKEN_DECODED } from 'redux/authentication/types';

class AppRouter extends Component {
    state = {
        authentication: false,
    }

    componentDidMount() {
        const { props: { dispatch } } = this;
        const token = localStorage.getItem('token');

        if (!token) {
            this.goToLogin();
            return;
        }

        const tokenDecoded = JSON.parse(token);
        // Validação se o token está expirado aqui invés do nome
        if (tokenDecoded.name) {
            dispatch({
                type: TOKEN_DECODED.SUCCESS,
                tokenDecoded,
            });
            this.setState({
                authentication: true,
            });
        } else {
            this.goToLogin();
        }
    }

    componentDidUpdate(prevProps) {
        const { props: { toastReducer, authenticationReducer: { tokenDecoded } } } = this;

        if (prevProps.toastReducer !== toastReducer) {
            toast(toastReducer.message, { type: toastReducer.type });
        }

        if (prevProps.authenticationReducer.tokenDecoded !== tokenDecoded) {
            let auth = false;
            if (tokenDecoded.name) {
                auth = true;
            }
            this.setState({
                authentication: auth,
            });
        }
    }

    goToLogin = () => {
        const { props: { history } } = this;
        history.push('/login');
    }


    render() {
        const { state } = this;

        return (
            <Fragment>

                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/forgotPassword' component={ForgotPassword} />
                    <Route path='/register' component={Register} />

                    {state.authentication &&
                        <Fragment>
                            <Header />
                            <Container color='light'>
                                <Route path='/' exact component={PurchaseList} />
                                <Route path='/myInfo' exact component={MyInfo} />
                            </Container>
                        </Fragment>
                    }
                </Switch>
                <ToastContainer />
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        toastReducer: state.toastReducer,
        authenticationReducer: state.authenticationReducer,
    }
}

export default withRouter(connect(mapStateToProps)(AppRouter));
