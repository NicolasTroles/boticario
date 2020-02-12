// Modules
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getFormValues, Field, reduxForm, change } from 'redux-form';
import validate from 'utils/formValidation';
import { translate } from 'react-translate';
import styled from 'styled-components';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';

// Components
import Modal from 'components/Modal/Modal';
import {
    Form,
    FormGroup,
    Label,
} from 'reactstrap';
import Input from 'components/Input/Input';

// Types
import { SHOW_TOAST } from 'redux/toast/types';

const currencyMask = createNumberMask({
    prefix: 'R$ ',
    decimalPlaces: 2,
    locale: 'pt-BR',
});

const dateMask = createTextMask({
    pattern: '99/99/9999',
});

const Wrapper = styled('div')`
    ${({ theme }) => `
        padding: ${theme.spacing.px20};
`};`

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

class RegisterPurchase extends Component {

    componentDidMount() {
        const { props: { dispatch, editingPurchase } } = this;
        if (editingPurchase) {
            dispatch(change('registerPurchase', 'codePurchase', editingPurchase.code));
            dispatch(change('registerPurchase', 'valuePurchase', editingPurchase.value));
            dispatch(change('registerPurchase', 'datePurchase', editingPurchase.date.split('-').reverse().join('')));
        }
    }


    register = (purchase) => {
        const { props: { t, toggleModal, authenticationReducer: { tokenDecoded: { id } } } } = this;

        let purchases = localStorage.getItem('purchases');

        const newPurchase = {
            userId: id,
            code: purchase[0],
            value: purchase[1],
            status: 'Em Validação',
            date: purchase[2].substr(4, 4) + '-' + purchase[2].substr(2, 2) + '-' + purchase[2].substr(0, 2),
        }

        if (purchases) {
            purchases = JSON.parse(purchases);

            if (purchases.some(purchase => purchase.code === newPurchase.code)) {
                this.showToast(t('PURCHASE_ALREADY_REGISTERED'), 'error');
            } else {
                purchases.push(newPurchase);
                localStorage.setItem('purchases', JSON.stringify(purchases));
                this.showToast(t('SUCCESS_REGISTER'), 'success');
                toggleModal(false);
            }
        } else {
            localStorage.setItem('purchases', JSON.stringify([newPurchase]));
            this.showToast(t('SUCCESS_REGISTER'), 'success');
            toggleModal(false);
        }
    }

    edit = (purchase) => {
        const { props: { t, toggleModal, editingPurchase, authenticationReducer: { tokenDecoded: { id } } } } = this;

        let purchases = localStorage.getItem('purchases');

        const newPurchase = {
            userId: id,
            code: purchase[0],
            value: purchase[1],
            status: 'Em Validação',
            date: purchase[2].substr(4, 4) + '-' + purchase[2].substr(2, 2) + '-' + purchase[2].substr(0, 2),
        }

        purchases = JSON.parse(purchases);

        purchases = purchases.filter(purchase => purchase.code !== editingPurchase.code);

        purchases.push(newPurchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        this.showToast(t('SUCCESS_REGISTER'), 'success');
        toggleModal(false);
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
        const { props: { editingPurchase, toggleModal, formValues, t, invalid } } = this;
        return (
            <Modal
                visible={true}
                effect='fadeInDown'
                width={530}
                onClickAway={() => toggleModal(false)}
                title={'Cadastro'}
                cancelButton={() => toggleModal(false)}
                cancelButtonText={'Cancelar'}
                buttonConfirmDisabled={invalid}
                confirmButton={editingPurchase ?
                    () => this.edit([formValues.codePurchase, formValues.valuePurchase, formValues.datePurchase]) :
                    () => this.register([formValues.codePurchase, formValues.valuePurchase, formValues.datePurchase])
                }
                confirmButtonText={editingPurchase ? 'Alterar' : 'Cadastrar'}
            >
                <Wrapper>
                    <Form>
                        <FormGroup>
                            <Label for="codePurchase">{t('CODE')}:</Label>
                            <FieldStyled
                                name="codePurchase"
                                component={Input}
                                id="codePurchase"
                                type="text"
                                placeholder={t('TYPE_CODE')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="valuePurchase">{t('VALUE')}: </Label>
                            <FieldStyled type="text"
                                component={Input}
                                name="valuePurchase"
                                id="valuePurchase"
                                {...currencyMask} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="datePurchase">{t('DATE')}: </Label>
                            <FieldStyled type="text"
                                component={Input}
                                name="datePurchase"
                                id="datePurchasee"
                                {...dateMask} />
                        </FormGroup>
                    </Form>
                </Wrapper>

            </Modal>
        )
    }
}

RegisterPurchase = reduxForm({
    form: 'registerPurchase',
    validate,
})(RegisterPurchase)


function mapStateToProps(state) {
    return {
        formValues: getFormValues('registerPurchase')(state),
        authenticationReducer: state.authenticationReducer,
    }
}

export default translate('Header')(connect(mapStateToProps)(RegisterPurchase));
